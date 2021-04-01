const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);
const validator = require('validator');

const catalogueSchema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, 'Item is Required']
    },
    unitCost: {
        type: Float,
        required: [true, 'UnitCost is Required']
    },
    stockSize: {
        type: Number
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = catalogueSchema;
//module.exports = mongoose.model('catalogue', catalogueSchema);