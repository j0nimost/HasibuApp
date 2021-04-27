const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.route('/')
        .post(paymentController.addPaymentAsync);

module.exports = router;