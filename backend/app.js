const express = require('express');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/courseRoutes');

//load env vars
dotenv.config();

//initialize app
const app = express();

//middlwae to parse json
app.use(express.json());

//routes
app.use('/api',courseRoutes)

//start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});