import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from '../utils/apiResponse.js'
import {Job} from '../models/job.model.js'


export const postJob = async(req, res, next)=> {
    try {
        const {companyId} = req.params;
        const {position, jobDescription, opening, salary, deadline, jobType, mostHaveSkills, goodToHaveSkills, techSatck, experience} = req.body;
        if(!deadline || !position || !jobDescription || !opening || !salary || !experience) {
            return next(new ApiError(400, "Please provide all the required fields"))
        }
        if(req.user.role !== 'employer'){
            return next(new ApiError(400, "You are not authorized to post a job"))
        }

        const job = await Job.create({
            company:companyId,
            postedBy:req.user._id,
            position,
            jobDescription,
            opening,
            salary,
            deadline,
            jobType,
            mostHaveSkills,
            goodToHaveSkills,
            techSatck,
            experience
        })


        return res.status(201).json(new ApiResponse(true, "Job posted successfully", {job}))


    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const getJobs = async(req, res, next)=> {
    try {
        
    } catch (error) {
        console.error(error);
        nect(error);
    }
}


export const getJob = async(req, res, next)=> {
    try {
        const {jobId} = req.params;
        const job = await Job.findById(jobId).populate('company', 'name location companySize');
        return res.status(200).json(new ApiResponse(true, "Job fetched successfully", {job}))
    } catch (error) {
        console.error(error);
        nect(error);
    }
}



export const updateJob = async(req, res, next)=> {
    try {
        
    } catch (error) {
        console.error(error);
        nect(error);
    }
}



export const deleteJob = async(req, res, next)=> {
    try {
        
    } catch (error) {
        console.error(error);
        nect(error);
    }
}

