const invoiceModel = require('../models/invoiceModel');
const AppError = require('../utils/appError');


exports.addPaymentAsync = async(req, res, next) => {

    // Update the existing Invoice
    // Pass in the payment request with the invoice code and receipt to it.
    
    try{
        
        const invoiceItems = await invoiceModel.find({invoiceNo: req.body.invoiceRef});
        const invoiceItem = invoiceItems[0]; // get only first element

        if(!invoiceItem)
        {
            return next(new AppError(404, "Not Found", "Invoice Not Found"));
        }

        let invoicePayments = [];

        if(invoiceItem.paymentItems !== undefined)
        {
            invoicePayments = invoiceItem.paymentItems;
            invoicePayments.push(req.body);
        }
        else
        {
            
            invoicePayments.push(req.body);
        }


        // Update invoice

        const updateInvoicePayment = await invoiceModel.updateOne(
            {_id: invoiceItem._id},
            {$set: {
                paidAmount: invoiceItem.paidAmount + req.body.amount,
                outstandingBalance: invoiceItem.outstandingBalance - req.body.amount,
                paymentItems: invoicePayments
            }});

        res.status(204).json({
            status: 'Success',
            data: updateInvoicePayment
        });

    }
    catch(error)
    {
        next(error);
    }

}