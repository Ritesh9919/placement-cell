import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from '../utils/apiResponse.js'
import {Company} from '../models//company.model.js'




export const addCompany = async(req, res, next)=> {
    try {
        const {name, aboutCompany, location, companySize} = req.body;
        if(!name || !aboutCompany || !location || !companySize) {
            return next(new ApiError(400, 'All fields are required'));
        }
        
        
        if(req.user.role !== 'employer') {
            return next(new ApiError(400, 'Only employer can add company'));
        }

        const company = await Company.create({name, aboutCompany, location, companySize, employer:req.user._id})
        return res.status(200).json(new ApiResponse(true, "Company added", {company}))
    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const getCompanies = async(req, res, next)=> {
    try {
        const companies = await Company.find();
        return res.status(200).json(new ApiResponse(true, "Companies fetched", {companies}))
    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const getCompany = async(req, res, next)=> {
    try {
        const {companyId} = req.params;
         const company = await Company.findById(companyId);
        return res.status(200).json(new ApiResponse(true, "Company fetched", {company}))
    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const updateCompany = async(req, res, next)=> {
    try {
          const {companyId} = req.params;
          const {name, aboutCompany, location, companySize} = req.body;
        if(!name || !aboutCompany || !location || !companySize) {
            return next(new ApiError(400, 'All fields are required'));
        }

        if(req.user.role !== 'employer') {
            return next(new ApiError(400, 'Only employer can add company'));
        }

        const company = await Company.findByIdAndUpdate(
            companyId,
            {$set:{name, aboutCompany, location, companySize}},
            {new:true}
        )
        return res.status(200).json(new ApiResponse(true, "Company updated", {company}))
    } catch (error) {
        console.error(error);
        next(error);
    }
}



export const deleteCompany = async(req, res, next)=> {
    try {
          const {companyId} = req.params;
         
        if(req.user.role !== 'employer') {
            return next(new ApiError(400, 'Only employer can add company'));
        }

         await Company.findByIdAndDelete(companyId);
        return res.status(200).json(new ApiResponse(true, "Company deleted", {}))
    } catch (error) {
        console.error(error);
        next(error);
    }
}