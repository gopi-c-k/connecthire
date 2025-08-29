import express from 'express';
import { fillJobSeekerForm } from '../controllers/jobSeeker/jobseekerProfileUpdateProfileController.js';
import { verifyJobSeeker } from '../middleware/verifyJobSeeker.js';
import verifyMiddleware from '../middleware/userVerify.js';
import { getJobSeekerProfile } from '../controllers/jobSeeker/getJobSeekerProfile.js';
import {applyToJob} from '../controllers/jobProposal/jobProposalApplying.js';
import { getJobProposals } from '../controllers/jobProposal/getJobProposalJobSeeker.js';
const router = express.Router();

router.put('/profile',verifyMiddleware, verifyJobSeeker, fillJobSeekerForm);
router.get('/profile', verifyMiddleware, verifyJobSeeker, getJobSeekerProfile);
router.post('/apply/:jobId', verifyMiddleware, verifyJobSeeker, applyToJob);
router.get('/proposals', verifyMiddleware, verifyJobSeeker, getJobProposals);

export default router;