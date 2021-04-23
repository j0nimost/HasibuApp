// FORCED TO DO THIS CAUSE:
// Using the default ServerJs App creates a new connection of Mongoose which conflicts with the Mongoose connection in memory
// I need a drink


const apptest = require("../../app");

apptest.listen();

module.exports = apptest;