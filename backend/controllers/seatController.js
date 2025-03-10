const {query} = require('../config/db');


//controller to get all prefixes
const getPrefixes = async (req,res) => {
    try {
        const result = await query('SELECT DISTINCT course_prefix FROM course_seats');
        const prefixes = result.rows.map( (row) => (
            {
                prefix: row.course_prefix
            }
        ));
        res.status(200).json(prefixes);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Failed to fetch prefixes'});
    }
};

//controller to get all course numbers w/ given prefix
const getCourseNumbers = async (req,res) => {
    const prefix = req.query.prefix; //get prefix from query
    
    try{
        const result = await query(`SELECT DISTINCT course_number FROM course_seats WHERE course_prefix = '${prefix.toUpperCase()}'`)
        res.status(200).json(result.rows);
        
    } catch(err) {
        res.status(500).json({err: 'Error fetching course numbers'});
    }
};

//controller to get all seats for a given course
const getSeats = async (req,res) => {
    const prefix = req.query.prefix; //get prefix from query
    const number = req.query.number; //get number from query
    try{
        const result = await query(`SELECT course_crn, course_title, course_section,seats_available, course_prefix, course_number FROM course_seats WHERE course_prefix = '${prefix.toUpperCase()}' AND course_number = '${number}'`)
        res.status(200).json(result.rows);
        
    } catch(err) {
        res.status(500).json({err: 'Error fetching course numbers'});
    }
};

module.exports = {
    getPrefixes,
    getCourseNumbers,
    getSeats
}