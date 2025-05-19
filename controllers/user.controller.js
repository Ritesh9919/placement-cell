import {User} from '../models/user.model.js';
import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from '../utils/apiResponse.js'
import {uploadOnCloudinary} from '../utils/uploadOnCloudinary.js'


export const register = async(req,res, next)=> {
    try {
        
        const {name, about, email, password, skills, location, dob, role} = req.body;
        
        if(!name || !about || !email || !password || !skills || !location) {
            return next(new ApiError(400, "All fields are required"));
        }
        const profilePictureLocalPath = req.files?.profilePicture[0]?.path;
        const resumeLocalpath = req.files?.resume[0]?.path;

        if(!profilePictureLocalPath) {
            return next(new ApiError(400, "profile file is required"));
        }

        if(!resumeLocalpath) {
            return next(new ApiError(400, "resume file is required"));
        }

        const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
        const resume = await uploadOnCloudinary(resumeLocalpath);
        

        const user = await User.findOne({email});
        if(user) {
            return next(new ApiError(400, "User already exists"));
        }

       const newUser = await User.create({
        name,
        about,
        email,
        password,
        dob,
        location,
        resume:resume.url,
        profilePicture:profilePicture.url,
        skills,
        role
       })

       return res.status(201).json(new ApiResponse(true, "User register successfully", {user:newUser}))

    } catch (error) {
        console.error(error);
        next(error);
    }
}