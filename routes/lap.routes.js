const express=require("express");
const { mlTest, predictLoan, getApplicationById, fetchApplications, deleteApplicationById } = require("../controllers/lap.controller");
const router=express.Router()


router.get("/ml-test",mlTest)

router.post("/",predictLoan)
router.get("/applications/:id",fetchApplications)
router.get("/application/:id",getApplicationById)
router.delete("/application/:id",deleteApplicationById)
module.exports=router