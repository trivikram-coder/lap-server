const mongoose=require("mongoose")
require("dotenv").config()
const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connected successfully")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports=connectDb