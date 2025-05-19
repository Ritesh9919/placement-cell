import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
  company:{
    type:mongoose.Types.ObjectId,
    ref:"Company"
  },
  postedBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  experience:{
    type:String,
    required:true
    
  },
  position:{
   type:String,
   required:true
  },
  salary:{
    type:String,
    required:true
  },
  jobDescription:{
    type:String,
    required:true
  },
  opening:{
    type:Number,
    required:true
  },
  
  deadline:{
    type:Date,
    required:true
  },
  jobType:{
    type:String,
    enum:["internship", "job", "internship+ppo"],
    default:'job'
  },
  
  mostHaveSkills:[String],
  goodToHaveSkills:[String],
  techStack:String
},{timestamps:true});


export const Job = mongoose.model("Job", jobSchema);