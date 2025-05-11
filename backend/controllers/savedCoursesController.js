const { query } = require('../config/db');

const saveCourse = async (req, res) => {
    try {
        const { course_crn } = req.body;
        const userId = req.user.id; // From JWT token
        
        // Validate input
        if (!course_crn) {
            return res.status(400).json({ message: 'Course CRN is required' });
        }

        // Check if course exists in course_seats
        const courseExists = await query(
            'SELECT course_crn FROM course_seats WHERE course_crn = $1',
            [course_crn]
        );

        if (courseExists.rows.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if already saved
        const existingSave = await query(
            'SELECT * FROM saved_courses WHERE user_id = $1 AND course_crn = $2',
            [userId, course_crn]
        );

        if (existingSave.rows.length > 0) {
            return res.status(400).json({ message: 'Course already saved' });
        }

        // Save course
        await query(
            'INSERT INTO saved_courses (user_id, course_crn) VALUES ($1, $2)',
            [userId, course_crn]
        );

        res.status(201).json({ message: 'Course saved successfully' });

    } catch (error) {
        console.error('Error saving course:', error);
        res.status(500).json({ message: 'Failed to save course' });
    }
};

const removeCourse = async (req, res) => {
    try {
        const { course_crn } = req.params;
        const userId = req.user.id;

        const result = await query(
            'DELETE FROM saved_courses WHERE user_id = $1 AND course_crn = $2',
            [userId, course_crn]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Saved course not found' });
        }

        res.json({ message: 'Course removed successfully' });

    } catch (error) {
        console.error('Error removing course:', error);
        res.status(500).json({ message: 'Failed to remove course' });
    }
};

const getSavedCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const savedCourses = await query(
            `SELECT sc.*, cs.* 
             FROM saved_courses sc
             JOIN course_seats cs ON sc.course_crn = cs.course_crn
             WHERE sc.user_id = $1
             ORDER BY sc.created_at DESC`,
            [userId]
        );

        res.json(savedCourses.rows);

    } catch (error) {
        console.error('Error fetching saved courses:', error);
        res.status(500).json({ message: 'Failed to fetch saved courses' });
    }
};

module.exports = {
    saveCourse,
    removeCourse,
    getSavedCourses
}; 