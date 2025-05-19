import express from 'express';
const router = express.Router();
import {login, logout} from '../controllers/auth.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js';

router.post('/login', login);
router.post('/logout', authenticate,logout);

export default router;