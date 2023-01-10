const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const {userLogin} = require("../middleware/middleware")
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
    
    if(password !==confirmPassword){
        return res.status(400).json({
           error : "Password and confirm password must be same"
        })
    }
    let user = await User.findOne({userName});
    // console.log(user == null)
        if(user){
            return res.status(400).json({
                error:"user name already exists"
            })
        }

        // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        //     // Store hash in your password DB.
        // });

        bcrypt.hash(password,10,async(err,hash)=>{
            if(err){
                return res.json({
                    error: err.message
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
       error:err.message
    })
}
})

router.post("/login",async(req,res)=>{
    try{
    const {userName,password}= req.body;
  
    const user = await User.findOne({userName});
    // console.log(user == null)
        if(!user){
            return res.status(400).json({
                error:"username does not exit"
            })
        }
    let loginPassword = await bcrypt.compare(password,user.password);
    if(!loginPassword){
        return res.status(422).json({
            error:"invalid credentials"
        })
    }
    const token = jwt.sign({_id:user._id},""+process.env.SECRET)
    res.json({
        user,
        token,
        status:"succes",
        message:"login successfully done"
    })
  
}catch(err){
    return res.status(400).json({
        error:err.message
    })
}
})


router.post("/addActivity",userLogin,async(req,res)=>{
    const {activity,status,timeTaken,action }=req.body;

    try{
        // console.log(1)
        const new_post = {activity,status,timeTaken,action}
        const post = await Post.create(new_post)
        console.log(post,"post")
        const user= await User.findById(req.user._id)
        user.tasks.push(post._id);
        await user.save();
        res.status(201).json({
            status :"Task created",
            task : post
        })
    }catch (error) {
        res.json({error:error.message})
    }
})

router.put("/editActivity",userLogin,async(req,res)=>{
    try {
       let task=await Post.findById(req.body.task._id)
       let updateTask= await Post.updateOne({_id:req.body.task._id},{$set:{TimeTaken:req.body.TimeTaken}})
       res.json(task)
    } catch (error) {
        res.json({error:error.message})
    }
})

router.get("/home",userLogin,async(req,res)=>{
    // console.log(req.user)
    let TaskIds=await User.findById(req.user._id)
    // console.log("TaskIds",TaskIds)
    let ids=TaskIds.tasks
    // console.log("ids",ids)
    // console.log(data.posts[0],typeof(data.posts[0]))
    var obj_ids = ids.map(function(id) { return String(id); });
    // console.log("obj_ids",obj_ids)
    let data=await Post.find({"_id":{$in : obj_ids}})

    console.log(data,"data")
    res.send(data)
})
module.exports = router;
