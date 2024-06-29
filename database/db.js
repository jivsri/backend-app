import mongoose from "mongoose";
export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "backend-api",
    }).then(()=>{
        
        console.log("database connected");
    }).catch((err)=>{
        console.log(process.env.MONGO_URI);
        console.log("error detected: ",err);
    });
    
}