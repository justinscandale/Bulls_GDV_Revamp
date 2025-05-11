const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { query } = require('../config/db');
    
// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleOAuthCallback = async (req, res) => {
    try {
        const { credential } = req.body;
        
        if (!credential) {
            return res.status(400).json({ message: 'No credential provided' });
        }

        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, sub: googleId, name, picture } = payload;

        // Check if user exists by Google ID first
        const userExists = await query(
            'SELECT * FROM users WHERE google_id = $1',
            [googleId]
        );

        let userId;
        
        if (userExists.rows.length > 0) {
            // User exists with Google ID
            userId = userExists.rows[0].id;
            
            // Update email if it changed
            if (userExists.rows[0].email !== email) {
                await query(
                    'UPDATE users SET email = $1 WHERE id = $2',
                    [email, userId]
                );
            }
        } 
        else {
                // Create new user
                const newUser = await query(
                    'INSERT INTO users (email, google_id, name, profile_picture) VALUES ($1, $2, $3, $4) RETURNING id',
                    [email, googleId, name, picture]
                );
                userId = newUser.rows[0].id;
            }
    

        // Generate JWT token
        const token = jwt.sign(
            { id: userId, googleId },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Send response
        res.json({
            token,
            user: {
                id: userId,
                googleId,
                email,
                name,
                picture
            }
        });

    } catch (error) {
        console.error('Google OAuth error:', error);
        res.status(400).json({ 
            message: 'Authentication failed',
            error: error.message 
        });
    }
};

module.exports = {
    googleOAuthCallback
};