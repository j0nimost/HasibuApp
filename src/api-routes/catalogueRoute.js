const express = require('express');
const catalogueController = require('../controllers/catalogueController');
const router = express.Router();
const authValidator = require('../middleware/authmiddleware');

router.use(authValidator);

router.route('/store/:storeId')
        .get(catalogueController.getAllCatalogues)
        .post(catalogueController.addCatalogue);

router.route('/:storeId/catalogue/:id')
        .get(catalogueController.getCatalogue)
        .delete(catalogueController.deleteCatalogue)
        .patch(catalogueController.updateCatalogue);


module.exports = router;