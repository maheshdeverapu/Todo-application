const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const userLogin = require("../middleware/middleware")
const Post = require("../models/postSchema")
// const {SECRET} = require("../config.env")
const jwt = require("jsonwebtoken");

router.get("/",(req,res)=>{
    res.send("i am from router")
})

router.post("/register",async(req,res)=>{
    console.log(req.body)
    try{
    const {userName,password,confirmPassword}= req.body;
    if(!userName || !password || !confirmPassword){
        return res.status(400).json({
            status:"failed",
            message:"please fill all fields..."
        })
    }
    if(password !==confirmPassword){
        return res.status(400).json({
            status:"failed",
            message:"password and confirm password must be same"
        })
    }
    let user = await User.findOne({userName});
    // console.log(user == null)
        if(user){
            return res.status(400).json({
                status:"failed",
                message:"username is already existed"
            })
        }

        // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        //     // Store hash in your password DB.
        // });

        bcrypt.hash(password,10,async(err,hash)=>{
            if(err){
                return res.json({
                    status:"Failed",
                    message:err.message
                }) 
            }
            user = await User.create({
                
                userName,
                password: hash,
                confirmPassword:hash
            });
            res.json({
                status:"Success",
                message:"Account sucessfully registered"
            }) 
        })

}catch(err){
    return res.status(400).json({
        status:"failed",
        message:err.message
    })
}
})

router.post("/login",async(req,res)=>{
    try{
    const {userName,password}= req.body;
    if(!userName || !password){
        return res.status(400).json({
            status:"failed",
            message:"please fill all fields..."
        })
    }
    const user = await User.findOne({userName});
    // console.log(user == null)
        if(!user){
            return res.status(400).json({
                status:"failed",
                message:"username does not exit"
            })
        }
    let loginPassword = await bcrypt.compare(password,user.password);
    if(!loginPassword){
        return res.status(422).json({
            status:"failed",
            message:"invalid credentials"
        })
    }
    const token = jwt.sign({_id:user._id},process.env.SECRET)
    res.json({
        userName,
        token,
        status:"succes",
        message:"login successfully done"
    })
  
}catch(err){
    return res.status(400).json({
        status:"failed",
        message:err.message
    })
}
})



router.get("/trail",userLogin,(req,res)=>{
    res.json({
        data:"i am okay"
    })
})

router.post("/post",userLogin,async(req,res)=>{
    const {activity,status }=req.body;
    try{
        if(!activity){
            return res.json({
                message:"please enter activity"
            })
        }
        const post = await Post.create({
            activity,
            status:"pending",
            timeTaken:"",
            action:""
        })
        console.log(post)
        res.json({
            status:"success",
            message:"todo added successfully"
        })
    }catch(err){
        res.status(422).send(err)
    }
})

router.get("/home",userLogin,async(req,res)=>{
    const post = await Post.find();
    console.log(post[0].activity)
    res.json({
        post
    })
})

module.exports = router;
