import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  aboutCompany:{
    type:String,
    required:true
  },
  location:{
    district:{type:String, required:true},
    state:{type:String, required:true}
  },
  
  companySize:{
    type:Number,
    required:true
  },
  employer:{
    type:mongoose.Types.ObjectId,
    ref:"Employer"
  }
  
},{timestamps:true});


export const Company = mongoose.model('Company', companySchema);