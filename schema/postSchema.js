var mongoose = require("mongoose")
var Schema = mongoose.Schema

var PostSchema = new Schema({
    id: {  //ID = UUID
        type: String,
        require: true
    },
    userId: {
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
    }
})

var Posts = mongoose.model("Post", PostSchema)
module.exports = Posts