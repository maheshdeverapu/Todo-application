const express = require("express");
const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    activity : {type:String,required:true},
    status: {type:String,required:true},
    timeTaken: {type:String},
    action: {type:String}
})

const post = mongoose.model("Post",postSchema);

module.exports = post;