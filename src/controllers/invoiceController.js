const base = require('./baseController');
const invoiceModel = require('../models/invoiceModel');
const appError = require('../utils/appError');
const AccountUtil = require('../utils/accountUtil');
// update the whole list
exports.updateInvoiceAsync = async(req, res, next) => {
    try {
        const updateInvoice = await invoiceModel.updateOne(
            {_id: req.params.id},
            {$set: {
                grossAmount: req.body.grossAmount,
                netAmount: req.body.netAmount,
                outstandingBalance: req.body.grossAmount,
                purchaseItems: req.body.purchaseItems
            }});

        if(!updateInvoice){
            return next(new appError(404, 'Not Found', 'Invoice Not Found'), req, res, next);
        }

        res.status(204).json({
            status: 'Success',
            data: updateInvoice
        });
    } catch (error) {
        next(error);
    }
};

exports.addAsync = async(req, res, next) => {
    try {

        // get count of invoices
        const invoices = await invoiceModel.find({businessId : req.params.storeId});


        const invoice = new invoiceModel({
            businessId : req.params.storeId,
            invoiceNo: invoices.length + 1,
            grossAmount: req.body.grossAmount,
            vat: req.body.vat,
            netAmount: req.body.netAmount,
            outstandingBalance: req.body.grossAmount,
            servedBy: req.body.servedBy,
            purchaseItems: req.body.purchaseItems
        });

        const invoiceItem = await invoice.save();

        var accountUtil = new AccountUtil();

        let _accountCount = await accountUtil.loadAccountCountAsync("HAC");
        
        console.log(_accountCount);
        let _accountRef = accountUtil.accountRefFormatter(_accountCount+1);
        //console.log(AccountUtil.HACCount);
        const accountObj = {
            accountRef: "HAC" + _accountRef,
            storeId: req.params.storeId,
            credit: req.body.grossAmount,
            description: 'Invoice'
        }

        await accountUtil.addAccountAsync(accountObj);

        res.status(201).json({
            status: 'Success',
            data: invoiceItem
        });

    } catch (error) {
        next(error);
    }
}

exports.getInvoicesAsync = async(req, res, next) =>{
    try {
        const invoiceItems = await invoiceModel.find({businessId : req.params.storeId});

        res.status(200).json({
            status: 'Success',
            data: invoiceItems
        });
    } catch (error) {
        next(error);
    }
    
}

exports.getInvoiceAsync = base.getAsync(invoiceModel);
