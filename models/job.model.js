import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
  companyId:{
    type:mongoose.Types.ObjectId,
    ref:"Company"
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
  interviewRounds:[String],
  mostHaveSkills:[String],
  goodToHaveSkills:[String],
  techStack:String
},{timestamps:true});


export const Job = mongoose.model("Job", jobSchema);