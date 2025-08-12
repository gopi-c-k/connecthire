import express from 'express';
import { createJob } from '../controllers/job/jobFormController.js';
import { verifyCompany } from '../middleware/verifyCompany.js';
import verifyMiddleware from '../middleware/userVerify.js';
import { getCompanyProfile } from '../controllers/company/getCompanyProfile.js';

const router = express.Router();

router.put('/fill-form',verifyMiddleware, verifyCompany, createJob);
router.get('/profile', verifyMiddleware, verifyCompany, getCompanyProfile);

export default router;