import express from 'express';
const router = express.Router();
import {addCompany, getCompanies, getCompany, updateCompany, deleteCompany} from '../controllers/company.controller.js'
import {authenticateEmployer} from '../middlewares/auth.middleware.js'

router.post('/', authenticateEmployer, addCompany);
router.get('/:companyId', authenticateEmployer, getCompany);
router.get('/',  getCompanies);
router.put('/:companyId', authenticateEmployer, updateCompany);
router.delete('/:companyId', authenticateEmployer, deleteCompany);


export default router;