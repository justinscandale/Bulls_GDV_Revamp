const express = require('express');
const router = express.Router();
const { saveCourse, removeCourse, getSavedCourses } = require('../controllers/savedCoursesController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// Save a course
router.post('/', saveCourse);

// Remove a saved course
router.delete('/:course_crn', removeCourse);

// Get all saved courses for user
router.get('/', getSavedCourses);

module.exports = router; 