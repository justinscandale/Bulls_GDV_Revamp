const express = require('express');
const router = express.Router();
const {getPrefixes, getCourseNumbers, getSeats} = require('../controllers/seatController');


router.get('/prefixes', getPrefixes);
router.get('/numbers', getCourseNumbers);
router.get('/seats', getSeats);

module.exports = router;