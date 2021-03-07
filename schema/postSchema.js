var mongoose = require("mongoose")
var Schema = mongoose.Schema

var PostSchema = new Schema({
    id: {  
        type: String,
        require: true
    },
    userId: {//userId = UUID
        type: String
    },
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    imageUrl: {
        type: String
    },
    caption: {
        type: String
    },
    message: {
        type: String
    },
    date: {
        type: Date
    },
    countryCode: {
        type: String
    },
    status:{
        type: Boolean
    }
})

var Posts = mongoose.model("Post", PostSchema)
module.exports = Posts