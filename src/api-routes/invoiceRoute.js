const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const authValidator = require('../middleware/authmiddleware');

router.use(authValidator);

router.route('/invoice/:id')
        .get(invoiceController.getInvoiceAsync)
        .patch(invoiceController.updateInvoiceAsync);
router.route('/:storeId')
        .get(invoiceController.getInvoicesAsync)
        .post(invoiceController.addAsync);

module.exports = router;