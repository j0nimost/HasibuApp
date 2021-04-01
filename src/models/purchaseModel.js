const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const purchaseSchema = new mongoose.Schema({
    item: {
        type: String,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is Mandatory']
    },
    unitCost: {
        type: Float,
        required: [true, 'Amount is Mandatory']
    },
    grossAmount: {
        type: Float,
        required: [true, 'Gross Amount is Mandatory']
    }
    
});

module.exports = purchaseSchema;

//6542973