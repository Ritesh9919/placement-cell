import {User} from '../models/user.model.js';
import {Job} from '../models/job.model.js'
import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from '../utils/apiResponse.js'
import { Applications } from '../models/applications.model.js';




export const applyToJob = async(req, res, next)=> {
    try {
        const  {jobId} = req.params;
        const user = await User.findById(req.user._id);
        const job = await Job.findById(jobId);
        if(!user) {
           return next(new ApiError(404, "User not found"))
        }

        if(!job) {
             return next(new ApiError(404, "job not found"))
        }
        await Applications.create({jobId, userId:req.user._id});
        return res.status(200).json(new ApiResponse(true, "Application created", {}));

    } catch (error) {
        console.error(error);
        next(error);
    }
}


