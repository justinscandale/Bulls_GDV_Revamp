const express = require('express');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/courseRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const seatRoutes = require('./routes/seatRoutes');
const userRoutes = require('./routes/userRoutes');
const googleOAuthRoutes = require('./routes/googleOAuthRoutes');
const savedCoursesRoutes = require('./routes/savedCoursesRoutes');
const pool = require('./config/db');
const cors = require('cors');

//load env vars
dotenv.config();

//initialize app
const app = express();

//middlwae to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//allow access from frontend
app.use(cors({
    origin: ['http://localhost:5173', 'https://gradeabull.com'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//routes
app.use('/api/seats', seatRoutes)
app.use('/api',courseRoutes)
app.use('/api',summaryRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth/google', googleOAuthRoutes)
app.use('/api/saved-courses', savedCoursesRoutes)

//start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});