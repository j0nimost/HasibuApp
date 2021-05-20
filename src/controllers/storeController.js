const storesModel = require('../models/storesModel');
const StoreModel = require('../models/storesModel');
const AppError = require('../utils/appError');
const appError = require('../utils/appError');
const base = require('./baseController');

exports.updateStore = async(req, res, next) => {
    try {
        
        const updateStore = await StoreModel.updateOne(
            {_id: req.params.id},
            {$set: {
                businessName: req.body.businessName,
                location: req.body.location,
                town: req.body.town,
                county: req.body.town,
                ownerEmail: req.body.ownerEmail,
                ownerMobile: req.body.ownerMobile,
                ownerPostalAddress: req.body.ownerPostalAddress,
                businessType: req.body.businessType

            }
        });

        if(!updateStore){
            return next(new appError(404, 'Not Found', 'Record Not Found'), req, res, next);
        }
        res.status(200).json({
            status: 'Success',
            data: updateStore
        });
    } catch (error) {
        next(error);
    }
}


exports.getAllStores = async(req, res, next) => {
    try {
        const stores = await storesModel.find({userId:req.params.userId});

        if(stores.length < 1)
        {
            return next(new AppError(404, "Not Found", "Stores not Found"));
        }

        res.status(200).json({
            status: 'Success',
            data: stores
        });
    } catch (error) {
        
    }
}
exports.getStore = base.getAsync(StoreModel);
exports.addStore = base.addAsync(StoreModel);
exports.deleteStore = base.deleteAsync(StoreModel);