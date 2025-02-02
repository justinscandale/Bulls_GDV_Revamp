const express = require('express');
const router = express.Router();
// insert controller functions here const 
const {getPrefixes, getProfessorGradeData, getProfessors, getCourseNumbers, getGradeData} = require('../controllers/courseController')

//route to get all courses
router.get('/prefixes', getPrefixes)

//route to get data for professor w/ params first, last
router.get('/profdata', getProfessorGradeData)
//route to get all professors
router.get('/professors', getProfessors)

//route to get all course nums w/ given prefix
router.get('/coursenums', getCourseNumbers)

//route to get all grade data w/ given prefix-num
router.get('/gradedata', getGradeData)

module.exports = router