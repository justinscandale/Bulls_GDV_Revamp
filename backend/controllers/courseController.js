const {query} = require('../config/db');

//controller to get all courses
const getPrefixes = async(req,res) => {
    try {
        const result = await query('SELECT DISTINCT course_prefix FROM course_grades');
        const prefixes = result.rows.map( (row) => (
            {
                prefix: row.course_prefix
            }
        ));
        res.status(200).json(prefixes);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Failed to fetch courses'});
    }
};

//controler to get a professors grade dist data
const getProfessorGradeData = async(req,res) => {
    const last = req.query.lname 
    const first = req.query.fname 

    try{
        //get professors 
        if (last && first) {
            const result = await query(`SELECT SUM(a_num) as A, SUM(b_num) as B, SUM(c_num) as C, SUM(d_num) as D, 
                                        SUM(f_num) as F, SUM(a_num+b_num+c_num+d_num+f_num) as TOTAL, prof_lname, prof_fname
                FROM course_grades 
                WHERE prof_lname=$1 AND prof_fname=$2
                GROUP BY prof_lname, prof_fname`,
                [
                    last,
                    first
                ]);  // Use parameterized query
            
            res.json(result.rows)
        }
        else{
            throw new Error("Proper Params not given");
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Failed to fetch professors'});
    }
}

//controller to get all professors optional params: course_num, course_prefix
const getProfessors = async(req,res)=> {
    const courseNum = req.query.num;
    const coursePrefix = req.query.prefix;
    try{
        let result; 
        //get professors for course w/ PREFIX-NUM
        if (courseNum && coursePrefix) {
            result = await query(`SELECT DISTINCT prof_lname, prof_fname 
                                        FROM course_grades 
                                        WHERE course_num=$1 AND course_prefix=$2`,
                                        [courseNum, coursePrefix.toUpperCase()]);  // Use parameterized query
        }
        //get all professors
        else{
            result = await query('SELECT DISTINCT prof_lname, prof_fname FROM course_grades');
        }

        const professors = result.rows.map((row) => (
            {
            name: `${row.prof_lname}, ${row.prof_fname}`
            }
        ));

        res.status(200).json(professors);

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
        res.status(200).json(result.rows);
        
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
    getProfessorGradeData,
    getProfessors,
    getCourseNumbers,
    getGradeData,
};
