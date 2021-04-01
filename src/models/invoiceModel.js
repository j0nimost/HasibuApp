const mongoose = require('mongoose');
const purchaseSchema = require('./purchaseModel');
const Float = require('mongoose-float').loadType(mongoose);

const invoiceSchema = new mongoose.Schema({
    businessId:  {
        type: String
    },
    invoiceNo: {
        type: Number
    },

    invoiceDate:{
        type: Date,
        default: Date.now()
    },

    grossAmount: {
        type: Float,
        required: [true, 'Total Gross Amount is Required']
    },

    vat: {
        type: Number,
        default: 16
    },

    netAmount: {
        type: Float,
        required: [true, 'Total Net Amount is Required']
    },
    servedBy:{
        type: String,
        required: [true, 'Server Name is Required']
    },
    purchaseItems : [purchaseSchema]

});

module.exports = mongoose.model('invoices', invoiceSchema);