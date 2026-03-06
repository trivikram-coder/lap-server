const { default: axios } = require("axios")
const express=require("express")
const router=express.Router()
require("dotenv").config();
const buildFeatures = require("../util/featureVector");
const LoanApplication = require("../model/Application");
const User = require("../model/User");

router.get("/ml-test",async(req,res)=>{
    try {
        const data=await axios.get(`${process.env.ML_SERVICE_URL}`);
        res.json(data.data)
    } catch (error) {
        res.json(error.message)
    }
})

router.post("/",async(req,res)=>{
    try {
      const features=req.body;
      const encodedFeatures=buildFeatures(features);

        const response=await axios.post(`${process.env.ML_SERVICE_URL}/predict`,
            {
                features:encodedFeatures
            }
        )
        if(response.status===200){
            await LoanApplication.create(features);
        }
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
router.get("/applications/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const existsUser=await User.findById(id);
        const applications=await LoanApplication.find({userId:id});
        if(!existsUser){
            return res.status(404).json({message:"User not exists,access denied"})
        }
        res.status(200).json({message:"Applications fetched successfully",data:applications})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
module.exports=router