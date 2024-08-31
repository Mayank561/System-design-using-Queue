const mongoose = require('mongoose');
require('dotenv').config();

const Mongo = process.env.MONGO_URI;

const DB = async () => {
    try {
        await mongoose.connect(Mongo, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = { DB };
