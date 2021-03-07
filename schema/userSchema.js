var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new Schema({
    firstName: {
        type: String,
    },
    userId: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    country: {
        type: {}
    },
    contact: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: String
    },
    isBlocked: {
        type: Boolean
    },
    blockedAt: {
        type: Date
    }
}, { strict: false })

var users = mongoose.model("user", userSchema)
module.exports = users