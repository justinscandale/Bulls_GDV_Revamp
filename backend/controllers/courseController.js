const {query} = require('../config/db');

//controller to get all courses
const getPrefixes = async(req,res) => {
    try {
        const result = await query('SELECT DISTINCT course_prefix FROM course_grades');
        res.json(result.rows.map(row=>row.course_prefix));
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Failed to fetch courses'});
    }
};

//controller to get all professors optional params: course_num, course_prefix
const getProfessors = async(req,res)=> {
    const courseNum = req.query.num;
    const coursePrefix = req.query.prefix;
    try{
        //get professors for course w/ PREFIX-NUM
        if (courseNum && coursePrefix) {
            const result = await query(`SELECT DISTINCT prof_lname, prof_fname 
                                        FROM course_grades 
                                        WHERE course_num=$1 AND course_prefix=$2`,
                                        [courseNum, coursePrefix.toUpperCase()]);  // Use parameterized query
            res.json(result.rows.map(row => { return row.prof_lname + ", " + row.prof_fname; }));
        }
        //get all professors
        else{
            const result = await query('SELECT DISTINCT prof_lname, prof_fname FROM course_grades');
            res.json(result.rows.map(row => { return row.prof_lname + ", " + row.prof_fname; }));
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Failed to fetch professors'});
    }
};

//controller to get all course nums w/ a given prefix
const getCourseNumbers = async(req, res)=>{
    const prefix = req.query.prefix; //get prefix from query
    
    try{
        const result = await query(`SELECT DISTINCT course_num FROM course_grades WHERE course_prefix = '${prefix.toUpperCase()}'`)
        res.json(result.rows.map(row=>row.course_num));
    } catch(err) {
        res.status(500).json({err: 'Error fetching course numbers'});
    }
};

//controller to get grade data for course w/ prefix-num
const getGradeData = async(req,res)=>{
    const courseNum = req.query.num;
    const coursePrefix = req.query.prefix;

    try{
        if (courseNum && coursePrefix) {
            const result = await query(`SELECT SUM(a_num) as A, SUM(b_num) as B, SUM(c_num) as C, SUM(d_num) as D, 
                                        SUM(f_num) as F, SUM(a_num+b_num+c_num+d_num+f_num) as TOTAL, prof_lname, prof_fname
                FROM course_grades 
                WHERE course_num=$1 AND course_prefix=$2
                GROUP BY prof_lname, prof_fname
                `,
                [courseNum, coursePrefix.toUpperCase()]);  // Use parameterized query
            
            res.json(result.rows)
        }
    } catch(error) {
        res.status(500).json({error:'Error fetching grade data'})
    }
};
module.exports = {
    getPrefixes,
    getProfessors,
    getCourseNumbers,
    getGradeData,
};
