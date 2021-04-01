const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
});

// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION!!! shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1);
// });

const port = process.env.PORT;
const database = process.env.DATABASE;
// Connect to Database
mongoose.connect(database, {useNewUrlParser: true}, () => {
    console.log("connected to the Database");
});

app.listen(port, () => {
    console.log(`HasibuAPP has started in port: ${port}`);
})