const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authValidator = require('../middleware/authmiddleware');

router.use(authValidator);

router.route('/')
        .post(paymentController.addPaymentAsync);

module.exports = router;