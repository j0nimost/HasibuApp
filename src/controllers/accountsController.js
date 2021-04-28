const base = require('./baseController');
const accountModel = require('../models/accountsModel');
const AppError = require('../utils/appError');



// get all accounts from a specific store
exports.getstoreAccountAsync = async (req, res, next) => {
    try 
    {
        // get storeid and fetch
        const storeAccounts = await accountModel.find({storeId: req.params.storeId});

        if(!storeAccounts)
        {
            next(new AppError(404, "Not Found", "Store Account Not Found"));
        }
        // return all the accounts

        res.status(200).json({
            status: "Success",
            data: storeAccounts
        });
    }
    catch (error)
    {
        next(error);
    }
}

exports.getAccountAsync = base.getAsync(accountModel);