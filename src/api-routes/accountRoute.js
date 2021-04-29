const express = require('express');
const accountController = require('../controllers/accountsController');
const router = express.Router();

router.route('/store/:storeId')
        .get(accountController.getstoreAccountAsync);

router.route('/:accountRef')
        .get(accountController.getAccountAsync);

module.exports = router;