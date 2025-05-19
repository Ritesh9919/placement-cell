import express from 'express';
const router = express.Router();
import {postJob, getJob, getJobs, updateJob, deleteJob} from '../controllers/job.controller.js'
import {authenticateEmployer, authenticateUser} from '../middlewares/auth.middleware.js'


router.post('/:companyId', authenticateEmployer, postJob);
router.get('/', authenticateUser, getJobs);
router.get('/:jobId', authenticateUser, getJob);
router.put('/:jobId', authenticateEmployer, updateJob);
router.delete('/:jobId', authenticateEmployer, deleteJob);


export default router;