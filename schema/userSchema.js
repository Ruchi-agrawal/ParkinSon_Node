var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new Schema({
    firstName: { 
        type: String,
        require: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique:true
    },
    contact: {
        type: String
    }
})

var users = mongoose.model("user", userSchema)
module.exports = users