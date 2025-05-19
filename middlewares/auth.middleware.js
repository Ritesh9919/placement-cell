import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/apiError.js'




export const authenticate = async(req, res, next)=> {
    try {
        const token = req.cookies.token;
        if(!token) {
            return next(new ApiError(401, "Unauthrized"))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return next(new ApiError(400, "Invalid token"));
        }

        const user = await User.findById(decoded.id).select('-password');
        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        next(error);
    }
}