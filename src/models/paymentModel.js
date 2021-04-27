const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const paymentSchema = new mongoose.Schema({
    paymentRefId: {
        type: String,
        uppercase: true,
        required: [true, "RefId is Mandatory"]
    },

    invoiceRef: {
        type: Number,
        required: [true, "Invoice Ref is Mandatory"]
    },

    amount: {
        type: Float,
        default: 0.00
    },

    paymentChannel: {
        type: String,
        required: [true, "Channel of Payment is Mandatory"]
    },

    paidBy: {
        type: String,
        required: [true, "Paid By is Mandatory"]
    },

    paymentDate: {
        type: Date,
        required: [true, "Payment Date is Mandatory"]
    },

    receivedDate: {
        type: Date,
        default: Date.now()
    }


});

module.exports = paymentSchema;
