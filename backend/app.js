const express = require('express');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/courseRoutes');
const pool = require('./config/db');
const cors = require('cors');

//load env vars
dotenv.config();

//initialize app
const app = express();

//middlwae to parse json
app.use(express.json());

//allow access from frontend port-5173
app.use(cors({
    origin: 'http://localhost:5173'
}));

//routes
app.use('/api',courseRoutes)

//start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});