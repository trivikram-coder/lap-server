const { default: axios } = require("axios")
const buildFeatures = require("../util/featureVector");
const LoanApplication = require("../model/Application");
const User = require("../model/User");
require("dotenv").config();
const mlTest=async(req,res)=>{
    try {
        const data=await axios.get(`${process.env.ML_SERVICE_URL}`);
        res.json(data.data)
    } catch (error) {
        res.json(error.message)
    }
}
const predictLoan=async(req,res)=>{
    try {
      const features=req.body;
      const encodedFeatures=buildFeatures(features);

        const response=await axios.post(`${process.env.ML_SERVICE_URL}/predict`,
            {
                features:encodedFeatures
            }
        )
        if(response.status!==200){
            res.status(response.status).json(response.data);
        }
        await LoanApplication.create({
            ...features,
            status:response.data.status,
            reasons:response.data.reasons
        })
        res.status(200).json(response.data)
    } catch (error) {
      
        res.status(500).json({error:error.message})
    }
}
const fetchApplications=async(req,res)=>{
    try {
        const id=req.params.id;
        const existsUser=await User.findById(id);
        const applications=await LoanApplication.find({userId:id}).sort({createdAt:-1});
        if(!existsUser){
            return res.status(404).json({message:"User not exists,access denied"})
        }
        res.status(200).json({message:"Applications fetched successfully",data:applications})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getApplicationById=async(req,res)=>{
    try{
        const id=req.params.id;
        const application=await LoanApplication.findById(id);
        if(!application){
            return res.status(404).json({message:"No application found"})
        }
        res.status(200).json({message:"Application fetched successfully",data:application})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
const deleteApplicationById=async(req,res)=>{
    try {
        const id=req.params.id;
        const deleteApplication=await LoanApplication.findByIdAndDelete(id);
        if(!deleteApplication){
            return res.status(400).json({message:"Unable to delete application"})

        }
        res.status(200).json({message:"Application deleted successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
module.exports= {mlTest,predictLoan,fetchApplications,getApplicationById,deleteApplicationById}