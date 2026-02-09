const { default: axios } = require("axios")
const express=require("express")
const router=express.Router()

const buildFeatures = require("../util/featureVector")

router.post("/predict",async(req,res)=>{
    try {
        console.log(req.body)
        const encodedFeatures=buildFeatures(req.body);
        console.log(encodedFeatures)
        const response=await axios.post("https://loan-approval-prediction-model-uzst.onrender.com/predict",
            {
                features:encodedFeatures
            }
        )
        res.status(200).json(response.data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
module.exports=router