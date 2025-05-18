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
  linkedinUrl:String,
  websiteurl:String,
  compnaySize:{
    type:Number,
    required:true
  },
  companyLogo:String
},{timestamps:true});


export const Company = mongoose.model('Company', companySchema);