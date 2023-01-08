const express = require("express");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    userName : {type:String,required:true,unique:true},
    password: {type:String,required:true},
    confirmPassword: {type:String,required:true},
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]
})

const user = mongoose.model("User",userSchema);

module.exports = user;