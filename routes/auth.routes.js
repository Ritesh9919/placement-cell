import express from 'express';
const router = express.Router();
import {login, logout, loginEmployer} from '../controllers/auth.controller.js'
import { authenticateUser } from '../middlewares/auth.middleware.js';

router.post('/login', login);
router.post('/logout', authenticateUser,logout);
router.post('/employer/login', loginEmployer);

export default router;