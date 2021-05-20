const mongoose = require('mongoose');
const storeModels = require('storesModels');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "FirstName is Required"]
    },
    lastName: {
        type: String,
        required: [true, "LastName is Required"]
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: [true, "Email is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

    stores :[storeModels],

    dateCreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('users', userSchema);