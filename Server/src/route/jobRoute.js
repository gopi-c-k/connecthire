import express from 'express';
import { createJob } from '../controllers/job/jobFormController.js';
import { verifyCompany } from '../middleware/verifyCompany.js';
import verifyMiddleware from '../middleware/userVerify.js';

const router = express.Router();

router.put('/fill-form',verifyMiddleware, verifyCompany, createJob);

export default router;