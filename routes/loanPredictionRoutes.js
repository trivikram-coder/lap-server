const { default: axios } = require("axios")
const express=require("express")
const router=express.Router()

const buildFeatures = require("../util/featureVector")
FEATURE_ORDER = [
    "credit_history",
    "applicant_income_log",
    "loan_amount_log",
    "loan_term_log",
    "gender_male",
    "married_yes",
    "dependents_1",
    "dependents_2",
    "dependents_3",
    "property_semiurban",
    "education_not_graduate",
    "self_employed_yes",
    "property_urban"
]
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