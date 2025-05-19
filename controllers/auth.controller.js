import { Employer } from '../models/employer.model.js';
import {User} from '../models/user.model.js';
import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from '../utils/apiResponse.js'



export const login = async(req, res, next)=> {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return next(new ApiError(400, 'Both fields are required'));
        }
        const user = await User.findOne({email});
        if(!user) {
            return next(new ApiError(401, "Invalid credentials"));
        }

        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return next(new ApiError(401, "Invalid credentials"));
        }

        const token = user.generateAuthToken();
        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res.cookie('token', token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none':'lax',
            maxAge:24 * 60 * 60 * 1000,
            expires:expiryDate,
            path:'/',
            domain:process.env.NODE_ENV == 'production' ? process.env.FRONTEND_DOMAIN:undefined

        })
        const loginUser = await User.findById(user._id).select('-password');
        return res.status(200).json(new ApiResponse(true, "Login successful", {user:loginUser}))
    } catch (error) {
        console.error(error);
       next(error); 
    }
}



export const logout = async(req, res, next)=> {
    
try {
        res.clearCookie("token", {
            httpOnly:true,
            secure: process.env.NODE_ENV == 'production',
            path:'/',
            
        
        })
        return res.status(200).json(new ApiResponse(true, "User logged out successfully", {}))
    } catch (error) {
        console.error(error);
       next(error); 
    }
}



export const loginEmployer = async(req,res,next)=>  {
    try {
        const {email} = req.body;
        if(!email) {
            return next(new ApiError(400, "Email is required"));
        }

        const employer = await Employer.findOne({email});
        if(employer) {
        const token = employer.generateAuthToken();
        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res.cookie('token', token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none':'lax',
            maxAge:24 * 60 * 60 * 1000,
            expires:expiryDate,
            path:'/',
            domain:process.env.NODE_ENV == 'production' ? process.env.FRONTEND_DOMAIN:undefined

        })

        return res.status(200).json(new ApiResponse(true, "Employer logged in", {}));
        }

        const employerUser = await Employer.create({email});
        const token = employerUser.generateAuthToken();
        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res.cookie('token', token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none':'lax',
            maxAge:24 * 60 * 60 * 1000,
            expires:expiryDate,
            path:'/',
            domain:process.env.NODE_ENV == 'production' ? process.env.FRONTEND_DOMAIN:undefined

        })

        return res.status(200).json(new ApiResponse(true, "Employer logged in", {}));
    } catch (error) {
        console.error(error);
        next(error)
    }
}



