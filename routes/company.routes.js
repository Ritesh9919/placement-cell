import express from 'express';
const router = express.Router();
import {addCompany, getCompanies, getCompany, updateCompany, deleteCompany} from '../controllers/company.controller.js'
import {authenticate} from '../middlewares/auth.middleware.js'

router.post('/', authenticate, addCompany);
router.get('/:companyId', authenticate, getCompany);
router.get('/',  getCompanies);
router.put('/:companyId', authenticate, updateCompany);
router.delete('/:companyId', authenticate, deleteCompany);


export default router;