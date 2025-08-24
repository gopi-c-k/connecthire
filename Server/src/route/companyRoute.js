// import express from 'express';
// import { createJob } from '../controllers/job/jobFormController.js';
// import { verifyCompany } from '../middleware/verifyCompany.js';
// import verifyMiddleware from '../middleware/userVerify.js';
// import { getCompanyProfile } from '../controllers/company/getCompanyProfile.js';
// import { updateCompanyProfile } from '../controllers/company/companyProfileUpdateController.js';

// const router = express.Router();

// router.put('/profile', verifyMiddleware, verifyCompany, updateCompanyProfile);
// router.get('/profile', verifyMiddleware, verifyCompany, getCompanyProfile);

// export default router;


import express from 'express';
import multer from 'multer';
import path from 'path';
import { createJob } from '../controllers/job/jobFormController.js';
import { verifyCompany } from '../middleware/verifyCompany.js';
import verifyMiddleware from '../middleware/userVerify.js';
import { getCompanyProfile } from '../controllers/company/getCompanyProfile.js';
import { updateCompanyProfile } from '../controllers/company/companyProfileUpdateController.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure "uploads" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Update with file upload
router.put('/profile', verifyMiddleware, verifyCompany, upload.single('companyLogo'), updateCompanyProfile);

// Get profile
router.get('/profile', verifyMiddleware, verifyCompany, getCompanyProfile);

export default router;
