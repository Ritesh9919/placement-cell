import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    profilePicture:String,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resumes:[String],
    skills:[String],
    dob:Date,
    location:{
        district:{type:String, required:true},
        state:{type:String,required:true}
    }

},{timestamps:true});


export const User = mongoose.model("User", userSchema);