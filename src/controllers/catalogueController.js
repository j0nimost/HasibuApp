const storeModel = require('../models/storesModel');
const appError = require('../utils/appError');


exports.updateCatalogue = async(req, res, next) => {
    try {
        const storeUpdated = await storeModel.updateOne(
            {_id: req.params.storeId, "catalogues._id": req.params.id},
            {$set: {catalogues: {
                item: req.body.item,
                unitCost: req.body.unitCost,
                stockSize: req.body.stockSize
            }}});

        res.status(200).json({
            status: 'Success',
            data: storeUpdated
        });

    } catch (error) {
        next(error);
    }
}

exports.getAllCatalogues = async(req, res, next) => {
    try {
        const getStoreCatalogues = await storeModel.findById(req.params.storeId);

        if(!getStoreCatalogues){
            return next(new appError(404, 'Not Found', 'Store Not Found'), req, res, next);
        }

        res.status(200).json({
            status: 'Success',
            data: getStoreCatalogues.catalogues
        });
    } catch (error) {
        next(error);
    }
}

exports.addCatalogue = async(req, res, next) => {
    try {

        const storeItem = await storeModel.findById(req.params.storeId);

        if(!storeItem){
            return next(new appError(404, 'Not Found', 'Store Not Found'), req, res, next);
        }

        storeItem.catalogues.push({
            item: req.body.item,
            unitCost: req.body.unitCost,
            stockSize: req.body.stockSize
        })

        const savedStore = await storeItem.save();

        res.status(201).json({
            status:'Success',
            data: savedStore
        });

    } catch (error) {
        next(error);
    }
}

exports.getCatalogue = async(req, res, next) => {
    try {
        const storeItem = await storeModel.findById(req.params.storeId);

        if(!storeItem){
            return next(new appError(404, 'Not Found', 'Store Not Found'), req, res, next);
        }

        //get catalogue
        const catalogueItem = storeItem.catalogues.find(catalogue => catalogue._id == req.params.id);

        if(!catalogueItem){
            return next(new appError(404, 'Not Found', 'Catalogue Item Not Found'), req, res, next);
        }

        res.status(200).json({
            status: 'Success',
            data: catalogueItem
        });

    } catch (error) {
        next(error);
    }
}

exports.deleteCatalogue = async(req, res, next)=> {
    try {
        const itemDel = await storeModel.updateOne(
            {_id: req.params.storeId},
            {
                $pull: {catalogues: {_id: req.params.id}}
            });
        res.status(204).json({
            status: 'Success',
            data: itemDel
        });
    } catch (error) {
        next(error)
    }
}