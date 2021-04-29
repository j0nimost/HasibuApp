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

exports.getAccountAsync = async (req, res, next) => {

    try
    {
        const accountItem = await accountModel.find({accountRef: req.params.accountRef});

        //console.log(accountItem);
        if(accountItem.length < 1)
        {
           return next(new AppError(404, 'Not Found', 'Account Record not Found'));
        }

        res.status(200).json({
            status: "Success",
            data: accountItem
        });

    } catch (error) {
        next(error)
    }
}