const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;


const mongoserver =new MongoMemoryServer();
const opts = { useUnifiedTopology: true, useNewUrlParser: true };

module.exports.openConnections = async () => {
    const mongoUri = await mongoserver.getUri();

    await mongoose.connect(mongoUri, opts, (err) => {
        if(err) console.log(err);
    });
}


module.exports.closeConnections = async () => {
    await mongoose.disconnect();
    await mongoserver.stop();
}

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for(const key in collections)
    {
        const collection = collections[key];
        await collection.deleteMany();
    }
};
