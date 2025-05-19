import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
        
    },
    role:{
        type:String,
        default:"user"
    },
    profilePicture:String,
    email:{
        type:String,
        required:true,
        unique:true
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

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateAuthToken = function() {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRY})
}



export const User = mongoose.model("User", userSchema);