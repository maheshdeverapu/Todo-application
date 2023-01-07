const express = require("express");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    userName : {type:String,required:true,unique:true},
    password: {type:String,required:true},
    confirmPassword: {type:String,required:true}
})

const user = mongoose.model("User",userSchema);

module.exports = user;