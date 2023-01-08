const jwt = require("jsonwebtoken");
// const {SECRET} = require("../config.env");
const mongoose = require("mongoose");
const User = require("../models/userSchema");


    
    exports.userLogin=async function(req,res,next){
        try {
            const {authorization}= req.headers
            if(!authorization ||authorization== "Bearer null"){
                return res.json({
                    error:"Please login first"
                })
            }
            let token=authorization.replace("Bearer ","")
            const decoded=jwt.verify(token,process.env.SECRET)
            req.user=await User.findById(decoded._id)
            next()
        } catch (error) {
            res.json({
                error:error.message
            })   
        }
    }
    // jwt.verify(token,process.env.SECRET,async(err,payload)=>{
    //     if(err){
    //         return res.status(400).json({
    //             status:"failed",
    //             message:err.message
    //         })
    //     }
    //     // console.log(payload)

    //     const {_id} = payload;
        // console.log(typeof(_id))
        // const user = await User.findById(_id);
        // console.log(user)
        
        // req.user = user;
        // req.user = user.userName
       
   


