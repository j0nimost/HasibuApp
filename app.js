const express = require("express");
const cors = require("cors");
const globalError = require("./src/controllers/errorController");
const AppError = require("./src/utils/appError");

// Routes
const storeRoute  = require('./src/api-routes/storeRoute');
const catalogueRoute = require('./src/api-routes/catalogueRoute');
const invoiceRoute = require('./src/api-routes/invoiceRoute');
// Create an instance
const app = express();

// Allow Cors
app.use(cors());

// Parse Json
app.use(express.json());

// API
app.use('/api/v1/stores', storeRoute);
app.use('/api/v1/catalogues', catalogueRoute);
app.use('/api/v1/invoices', invoiceRoute);

app.use('*', (req, res, next) => {
    const err = new AppError(404, 'Failed', 'Endpoint Not Found');
    next(err, req, res, next);
})

app.use(globalError);
module.exports = app