const jwt = require("jsonwebtoken");
// const {SECRET} = require("../config.env");
const mongoose = require("mongoose");
const User = require("../models/userSchema");

const userLogin = (req,res,next)=>{
    const {authorization } = req.headers;

    if(!authorization){
        return res.status(400).json({
            error:"you must logged in"
        }
        )
    }
    const token = authorization;
    jwt.verify(token,process.env.SECRET,async(err,payload)=>{
        if(err){
            return res.status(400).json({
                status:"failed",
                message:err.message
            })
        }
        // console.log(payload)

        const {_id} = payload;
        // console.log(typeof(_id))
        const user = await User.findById(_id);
        // console.log(user)
        
        req.user = user;
        // req.user = user.userName
        next();
    })
}

module.exports = userLogin