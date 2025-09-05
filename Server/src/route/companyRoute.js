 import express from 'express';
 import { verifyCompany } from '../middleware/verifyCompany.js';
 import verifyMiddleware from '../middleware/userVerify.js';
 import { getCompanyProfile } from '../controllers/company/getCompanyProfile.js';
 import { updateCompanyProfile } from '../controllers/company/companyProfileUpdateController.js';
 import { getCompanyJobList } from '../controllers/company/companyJobListController.js';
import { getJobProposalsForCompany } from '../controllers/jobProposal/getJobProposalCompany.js';
import { getCompanyCurrentStatus } from '../controllers/company/getCompanyCurrentStatus.js';
import { reportJobSeeker } from '../controllers/company/reportJobSeeker.js';
 const router = express.Router();

router.put('/profile', verifyMiddleware, verifyCompany, updateCompanyProfile);
router.get('/profile', verifyMiddleware, verifyCompany, getCompanyProfile);
router.get('/jobs', verifyMiddleware, verifyCompany, getCompanyJobList);
router.get('/job-proposals', verifyMiddleware, verifyCompany, getJobProposalsForCompany);
router.get('/current-status', verifyMiddleware, verifyCompany, getCompanyCurrentStatus);
router.post('/report',verifyMiddleware,verifyCompany,reportJobSeeker);


 export default router;


