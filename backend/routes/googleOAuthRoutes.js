const {googleOAuthCallback} = require('../controllers/googleOAuthController');
const express = require('express');
const router = express.Router();

router.post('/callback', googleOAuthCallback);

module.exports = router;