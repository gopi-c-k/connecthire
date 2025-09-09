import express from 'express';
import { fillJobSeekerForm } from '../controllers/jobSeeker/jobseekerProfileUpdateProfileController.js';
import { verifyJobSeeker } from '../middleware/verifyJobSeeker.js';
import verifyMiddleware from '../middleware/userVerify.js';
import { getJobSeekerProfile } from '../controllers/jobSeeker/getJobSeekerProfile.js';
import { applyToJob } from '../controllers/jobProposal/jobProposalApplying.js';
import { getJobProposals } from '../controllers/jobProposal/getJobProposalJobSeeker.js';
import { getJobSeekerDashboard } from '../controllers/jobSeeker/jobSeekerDashBoard.js';
import { getJobsForJobSeeker } from '../controllers/jobSeeker/getJobsForJobSeeker.js';
import { saveJob, getSavedJobs, unsaveJob } from '../controllers/jobSeeker/saveJobs.js';
import { reportCompany } from '../controllers/jobSeeker/reportCompany.js';
import { updatePrivacySettings, getPrivacySettings } from '../controllers/jobSeeker/privacySettingsController.js';
import { getCompanyProfile } from '../controllers/company/companyProfileController.js';
import { getConversationForJobSeeker } from '../controllers/jobSeeker/getConversation.js';


const router = express.Router();

router.put('/profile', verifyMiddleware, verifyJobSeeker, fillJobSeekerForm);
router.get('/profile', verifyMiddleware, verifyJobSeeker, getJobSeekerProfile);
router.post('/apply/:jobId', verifyMiddleware, verifyJobSeeker, applyToJob);
router.get('/proposals', verifyMiddleware, verifyJobSeeker, getJobProposals);
router.get('/dashboard', verifyMiddleware, verifyJobSeeker, getJobSeekerDashboard);
router.get('/jobs', verifyMiddleware, verifyJobSeeker, getJobsForJobSeeker);
router.post('/save-job/:jobId', verifyMiddleware, verifyJobSeeker, saveJob);
router.get('/saved-jobs', verifyMiddleware, verifyJobSeeker, getSavedJobs);
router.delete('/save-job/:jobId', verifyMiddleware, verifyJobSeeker, unsaveJob);
router.post('/report', verifyMiddleware, verifyJobSeeker, reportCompany);
router.get('/privacy-settings', verifyMiddleware, verifyJobSeeker, getPrivacySettings);
router.put('/privacy-settings', verifyMiddleware, verifyJobSeeker, updatePrivacySettings);
router.get('/company-profile/:companyId', verifyMiddleware, verifyJobSeeker, getCompanyProfile);
router.get('/conversations',verifyMiddleware,verifyJobSeeker,getConversationForJobSeeker);


export default router;