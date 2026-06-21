import mongoose from "mongoose";

export default async function connectDB(){
     try {
        if(!process.env.MONGO_URI){
            throw new Error("MONGO_URI is missing")
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully", process.env.MONGO_URI )
    } catch (error) {
        console.log("Failed to connect", error)
        process.exit(1);
    }
}