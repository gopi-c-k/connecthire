import express from 'express';
import { fillJobSeekerForm } from '../controllers/jobSeeker/jobseekerProfileUpdateProfileController.js';
import { verifyJobSeeker } from '../middleware/verifyJobSeeker.js';
import verifyMiddleware from '../middleware/userVerify.js';
import { getJobSeekerProfile } from '../controllers/jobSeeker/getJobSeekerProfile.js';
const router = express.Router();

router.put('/fill-form',verifyMiddleware, verifyJobSeeker, fillJobSeekerForm);
router.get('/profile', verifyMiddleware, verifyJobSeeker, getJobSeekerProfile);

export default router;