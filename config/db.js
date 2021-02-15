"use strict";
require('dotenv').config()
const {MONGO_DB_URL} = process.env
const mongoose = require("mongoose");

async function mongoConnect() {
    try {
        const response = await mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        if (response) console.log("Mongo Database Connected");
    }
    catch (error) {
        console.log("Error Occured while Mongo Connection", error.message);
    }
}

mongoConnect()
