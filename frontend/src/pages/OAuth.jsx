import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { handleGoogleCallback } from '../api/userApi';

function OAuth() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setError(''); // Clear any previous errors
            const { credential } = credentialResponse;
            
            const data = await handleGoogleCallback(credential);
            
            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/course-registration');
            } else {
                setError('Authentication failed: No token received');
            }
        } catch (error) {
            console.error('Google login error:', error);
            setError(error.message || 'Failed to authenticate with Google');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-white mb-6">Login / Signup</h1>
            {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200">
                    {error}
                </div>
            )}
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google login failed. Please try again.')}
            />
            {/* ADD BACK BUTTON DEPENDING ON PREVIEW STATUS */}
            <button
                onClick={() => navigate('/course-registration')}
                className="mt-4 w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                Back
            </button>
        </div>
        
    );
}

export default OAuth;
