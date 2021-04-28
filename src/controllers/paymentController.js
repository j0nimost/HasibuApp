const invoiceModel = require('../models/invoiceModel');
const AppError = require('../utils/appError');
const AccountUtil = require('../utils/accountUtil');

exports.addPaymentAsync = async(req, res, next) => {

    // Update the existing Invoice
    // Pass in the payment request with the invoice code and receipt to it.
    
    try{
        var accountInstance = new AccountUtil();
        const invoiceItems = await invoiceModel.find({invoiceNo: req.body.invoiceRef});
        const invoiceItem = invoiceItems[0]; // get only first element

        if(!invoiceItem)
        {
            return next(new AppError(404, "Not Found", "Invoice Not Found"));
        }

        let invoicePayments = [];


        if(await accountInstance.IsAccountTransactionRef(req.body.paymentRefId))
        {
            next(new AppError(403, "Forbidden Request", `There is an existing paymentRef : ${req.body.paymentRefId}`));
            
        }
        else
        {
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

            
            let _accountCount = await accountInstance.loadAccountCountAsync("HAP")
            let _accountRef = accountInstance.accountRefFormatter(_accountCount + 1);

            const accountObj = {
                accountRef: "HAP" + _accountRef,
                transactionRef: req.body.paymentRefId,
                storeId: invoiceItem.businessId,
                debit: invoiceItem.paidAmount,
                description:  req.body.paymentRefId + ` FOR ${invoiceItem.invoiceNo}`
            }
        
            await accountInstance.addAccountAsync(accountObj);

            res.status(204).json({
                status: 'Success',
                data: updateInvoicePayment
            });
        }
    }
    catch(error)
    {
        next(error);
    }

}