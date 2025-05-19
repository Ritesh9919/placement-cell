import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const employerSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    
    role:{
        type:String,
        default:"employer"
    }
},{timestamps:true});






employerSchema.methods.generateAuthToken = function() {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRY})
}


export const Employer = mongoose.model("Employer", employerSchema)