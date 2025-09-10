import express from 'express';
import { verifyCompany } from '../middleware/verifyCompany.js';
import verifyMiddleware from '../middleware/userVerify.js';
import { getCompanyProfile } from '../controllers/company/getCompanyProfile.js';
import { updateCompanyProfile } from '../controllers/company/companyProfileUpdateController.js';
import { getCompanyJobList } from '../controllers/company/companyJobListController.js';
import { getJobProposalsForCompany } from '../controllers/jobProposal/getJobProposalCompany.js';
import { getCompanyCurrentStatus } from '../controllers/company/getCompanyCurrentStatus.js';
import { reportJobSeeker } from '../controllers/company/reportJobSeeker.js';
import { getReports } from '../controllers/company/getReport.js';
import { updateCompanyPrivacySettings, getCompanyPrivacySettings } from '../controllers/company/privacySettingsController.js';
import { getJobSeekerProfile } from '../controllers/jobSeeker/getJobSeekerProfileController.js';
import { getCompanyConversation } from '../controllers/company/getConversation.js';
import { createConversation } from '../controllers/company/newConversation.js';

// Notification Routes
import { getNotifications } from '../controllers/company/getNotification.js';
import { markReadNotifications } from '../controllers/company/markReadNotification.js';
import { deleteNotification } from '../controllers/company/deleteNotification.js';

const router = express.Router();

router.put('/profile', verifyMiddleware, verifyCompany, updateCompanyProfile);
router.get('/profile', verifyMiddleware, verifyCompany, getCompanyProfile);
router.get('/jobs', verifyMiddleware, verifyCompany, getCompanyJobList);
router.get('/job-proposals', verifyMiddleware, verifyCompany, getJobProposalsForCompany);
router.get('/current-status', verifyMiddleware, verifyCompany, getCompanyCurrentStatus);
router.post('/report', verifyMiddleware, verifyCompany, reportJobSeeker);
router.get('/report', verifyMiddleware, verifyCompany, getReports);
router.get('/privacy-settings', verifyMiddleware, verifyCompany, getCompanyPrivacySettings);
router.put('/privacy-settings', verifyMiddleware, verifyCompany, updateCompanyPrivacySettings);
router.get('/jobseeker-profile/:jobSeekerId', verifyMiddleware, verifyCompany, getJobSeekerProfile);
router.get('/conversations', verifyMiddleware, verifyCompany, getCompanyConversation);
router.post('/conversation', verifyMiddleware, verifyCompany, createConversation);

// Notification Routes
router.get('/notifications', verifyMiddleware, verifyCompany, getNotifications);
router.put('/notifications/mark-read', verifyMiddleware, verifyCompany, markReadNotifications);
router.delete('/notifications', verifyMiddleware, verifyCompany, deleteNotification);
export default router;


