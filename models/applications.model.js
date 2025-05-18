import mongoose from "mongoose";



const applicationSchema = new mongoose.Schema({
   userId:{
    type:mongoose.Types.ObjectId,
    ref:"User"
   },
   jobId:{
    type:mongoose.Types.ObjectId,
    ref:'Job'
   }
},{timestamps:true});


export const Applications = mongoose.model("Applications", applicationSchema);