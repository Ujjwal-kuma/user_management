const dbconnect = require("./dbconnect")
let mongoose  = require("mongoose");
dbconnect();
const userschema = mongoose.Schema({
    image:{
        type:String,
        required: true,
    },
    fname:{
        type:String,
        required: true,
    },
    lname:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        uniqueCaseInsensitive: true,
    },
    phone:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
});
module.exports= userschema;