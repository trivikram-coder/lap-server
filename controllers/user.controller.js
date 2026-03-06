const User=require("../model/User")
const bcrypt=require("bcryptjs")

const axios=require("axios")
require("dotenv").config()
const register=async(req,res)=>{
    try {
        
        const {userName,mobileNumber,email,password}=req.body;
        if(!userName||!mobileNumber||!email||!password){
            return res.status(400).json({success:false,message:"Please provide every details"});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false,message:"User already registered please login"})
        }
        const hashPass=await bcrypt.hash(password,10);
        
        
        const user=new User({
            userName:userName,
            mobileNumber:mobileNumber,
            email:email,
            password:hashPass
        })
        await user.save(); 
        res.status(201).json({success:true,message:"User registered successfully",user:user})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const login=async(req,res)=>{
    try {
        const{email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({success:false,message:"Please enter email and password"})

        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message:"User not exists please register"})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid password"});
        }
        res.status(200).json({success:true,message:"Login successful",user:{
            id:user._id,
            userName:user.userName,
            mobileNumber:user.mobileNumber,
            email:user.email,
            joinedAt:user.createdAt
        }})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}
const getUser=async(req,res)=>{
    const id=req.params.id;
    const user=await User.findById(id).select("-password");
    if(!user){
        return res.status(404).json({success:false,message:"User not exists"});
    }
    res.status(200).json({success:true,message:"User fetched successfully",user:user})
}
const updateUser=async(req,res)=>{
    try {
        const id=req.params.id
        const updatedUser=await User.findByIdAndUpdate(
            id,
            req.body,
            {new:true,runValidators:true}
    )
    if(!updatedUser){
        return res.status(404).json({success:false,message:"User not found"})
    }
    res.status(200).json({
        success:true,
        message:"User updated successfully",
        updatedUser:updatedUser
    })
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}
const checkEmail=async(req,res)=>{
    try {
        const email=req.params.email;
        if(!email){
            return res.status(400).json({success:false,message:"Please provide email"})
        }
        const existUser=await User.findOne({email});
        if(!existUser){
            return res.status(404).json({status:false,message:"Email not exists"});
        }
        res.status(200).json({status:true,message:"Email exists"})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}
const resetPassword=async(req,res)=>{
    try {
       
        const {email,newPassword}=req.body;
        console.log(email)
        const hashPass=await bcrypt.hash(newPassword,10)
       
        const updatedPassword=await User.findOneAndUpdate({email},{password:hashPass},{new:true,runValidators:true});
        
        if(!updatedPassword){
            return res.status(404).json({success:false,message:"User not found or unauthorized"})
        }
        res.status(200).json({success:true,message:"Password reset successful"})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}
module.exports={register,login,getUser,updateUser,resetPassword,checkEmail}