import mongoose from "mongoose";

export const connectdb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongodb successfully");
    }catch(error){
        console.log("error while connecting to mongodb",error);
        process.exit(1); //exit the process with failure
    }
}