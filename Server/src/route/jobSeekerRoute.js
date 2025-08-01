import express from 'express';
import { fillJobSeekerForm } from '../controllers/jobSeekerFormController.js';
import { verifyJobSeeker } from '../middleware/verifyJobSeeker.js';
import verifyMiddleware from '../middleware/userVerify.js';

const router = express.Router();

router.put('/fill-form',verifyMiddleware, verifyJobSeeker, fillJobSeekerForm);

export default router;