import express from 'express';
const router = express.Router();
import {register} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'

router.post('/register', upload.fields([
    {
        name:'profilePicture',
        maxCount:1
    },
    {
    name:'resume',
    maxCount:1
    }
]), register);

export default router;