const mongoose = require("mongoose");
const validator = require("validator");
const catalogueSchema = require("./catalogueModel");

const storeSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: [true, "Please provide UserId"]
    },

    businessName: {
        type: String,
        required: [true, "Please provide your Business Name"],
    },

    location: {
        type: String
    },
    
    town: {
        type: String,
        required: [true, "Please provide your Town"],
    },

    county: {
        type: String,
        required: [true, "Please provide your County"],
    },

    ownerEmail: {
        type: String,
        required: [true, "Please provide your Email"],
        validate: [validator.isEmail, "Please provide a valid email"],
    },

    ownerMobile: {
        type: String,
        minLength: 8,
        required: [true, "Please provide your Mobile No"],
    },

    ownerPostalAddress: {
        type: String,
    },

    businessType: {
        type: String,
        enum: ["retail", "service"],
        default: "retail",
    },

    createdDate: {
        type: Date,
        default: Date.now(),
    },

    catalogues: [catalogueSchema]
});

module.exports = mongoose.model('stores', storeSchema);