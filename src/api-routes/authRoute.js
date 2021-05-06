const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/signup')
        .post(authController.signUpAsync);

router.route('/signin')
        .post(authController.signInAsync);

module.exports = router;
