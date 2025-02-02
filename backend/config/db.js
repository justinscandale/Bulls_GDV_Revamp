const { Pool } = require('pg'); 
require('dotenv').config() //Load env variables from .env

// Create pool to handle postgresql connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    databse: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

//Function to query db
const query = (text, params) => pool.query(text,params);

module.exports = {
    query
};