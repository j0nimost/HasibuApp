const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const accountSchema = mongoose.Schema({
    accountRef: {
        type: String,
        unique: true,
        uppercase: true,
        required: [true, 'AccountRef is Required']
    },

    storeId: {
        type: String,
        required: [true, 'StoreId is Required']
    },

    transactionRef: {
        type: String,
        uppercase: true
    },

    credit: {
        type: Float,
        default: 0.00
    },

    debit: {
        type: Float,
        default: 0.00
    },

    description: {
        type: String,
        required: [true, 'Description is required']
    },

    creationTimeStamp: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('accounts', accountSchema);