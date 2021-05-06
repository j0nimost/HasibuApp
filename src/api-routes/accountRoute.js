const express = require('express');
const accountController = require('../controllers/accountsController');
const router = express.Router();
const authValidator = require('../middleware/authmiddleware');

router.use(authValidator);

router.route('/store/:storeId')
        .get(accountController.getstoreAccountAsync);

router.route('/:accountRef')
        .get(accountController.getAccountAsync);

module.exports = router;