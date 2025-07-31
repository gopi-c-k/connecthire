import express from 'express';
import fillJobSeekerForm from '../controllers/jobSeekerFormController.js';
import { verifyJobSeeker } from '../middleware/verifyJobSeeker.js';

const router = express.Router();

router.put('/fill-form', verifyJobSeeker, fillJobSeekerForm);

export default router;