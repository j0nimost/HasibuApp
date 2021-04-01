const base = require('./baseController');
const invoiceModel = require('../models/invoiceModel');
const appError = require('../utils/appError');

// update the whole list
exports.updateInvoiceAsync = async(req, res, next) => {
    try {
        const updateInvoice = await invoiceModel.updateOne(
            {_id: req.params.id},
            {$set: {
                grossAmount: req.body.grossAmount,
                netAmount: req.body.netAmount,
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
            servedBy: req.body.servedBy,
            purchaseItems: req.body.purchaseItems
        });

        const invoiceItem = await invoice.save();

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