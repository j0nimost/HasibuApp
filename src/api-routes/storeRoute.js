const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const authValidator = require('../middleware/authmiddleware');

router.use(authValidator);

router.route('/')
        .get(storeController.getAllStores)
        .post(storeController.addStore);


router.route('/:id')
        .get(storeController.getStore)
        .patch(storeController.updateStore)
        .delete(storeController.deleteStore);

module.exports = router;