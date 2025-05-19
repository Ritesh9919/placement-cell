import express from 'express';
const router = express.Router();
import {applyToJob} from '../controllers/application.controller.js'
import {authenticateUser} from '../middlewares/auth.middleware.js'

router.post('/apply/:jobId', authenticateUser, applyToJob);
export default router;