const express = require("express")
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/user.model");
const jwt = require('jsonwebtoken');
const userRouter = express.Router()

userRouter.post("/register", (req,res)=>{
    const {email, name, pass} = req.body;
    try {
        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err){
               res.json({error:err.message})
            }else{
                const user = new UserModel({email,pass:hash,name})
                await user.save()
                res.json({msg:"User has been registered",user:req.body})
            }
        });
    } catch (error) {
        res.json({error:error.message})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,pass} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, function(err, result) {
                if(result){
                    const token = jwt.sign({ userID: user._id, user:user.name }, process.env.secretKey);
                    res.json({msg:"User logged in",token})
                }else{
                   res.json({msg:"wrong credentials!"})
                }
            });
        }else{
            res.json({msg:"user not found!"})
        }
        
    } catch (error) {
        res.json({error:error.message})
    }
})
module.exports = {
    userRouter
}