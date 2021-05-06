const express = require("express");
const cors = require("cors");
const globalError = require("./src/controllers/errorController");
const AppError = require("./src/utils/appError");

// Routes
const authRoute = require('./src/api-routes/authRoute');
const storeRoute  = require('./src/api-routes/storeRoute');
const catalogueRoute = require('./src/api-routes/catalogueRoute');
const invoiceRoute = require('./src/api-routes/invoiceRoute');
const paymentRoute = require('./src/api-routes/paymentRoute');
const accountRoute = require('./src/api-routes/accountRoute');
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
app.use('/api/v1/payment', paymentRoute);
app.use('/api/v1/account', accountRoute);
app.use('/api/v1/auth', authRoute);

app.use('*', (req, res, next) => {
    const err = new AppError(404, 'Failed', 'Endpoint Not Found');
    next(err, req, res, next);
})

app.use(globalError);
module.exports = app