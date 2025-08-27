import express from 'express';
import { createJob } from '../controllers/job/jobFormController.js';
import { verifyCompany } from '../middleware/verifyCompany.js';
import { JobDetailsController } from '../controllers/job/jobDetailController.js';
import verifyMiddleware from '../middleware/userVerify.js';
import { deleteJob } from '../controllers/job/JobDeleteController.js';

const router = express.Router();

router.put('/fill-form',verifyMiddleware, verifyCompany, createJob);
router.get('/:id', verifyMiddleware, verifyCompany, JobDetailsController);
router.delete('/:id', verifyMiddleware, verifyCompany, deleteJob);
export default router;