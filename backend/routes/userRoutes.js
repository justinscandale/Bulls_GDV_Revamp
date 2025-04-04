const express = require('express');
const router = express.Router();
const {signup, login, addCourse, getCourses} = require('../controllers/userController');


router.post('/signup', signup);
router.post('/addcourse', addCourse);
router.get('/getcourses', getCourses);
router.post('/login',login);


module.exports = router;