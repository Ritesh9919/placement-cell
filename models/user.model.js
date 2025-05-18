import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


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
    resume:String,
    skills:[String],
    dob:Date,
    location:{
        district:{type:String, required:true},
        state:{type:String,required:true}
    }

},{timestamps:true});


userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})



export const User = mongoose.model("User", userSchema);