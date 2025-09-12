import express from "express";

import { deactivateUser } from "../controllers/admin/deactivateUser.js";
import { deleteUser } from "../controllers/admin/deleteUser.js";
import { getAllCompany } from "../controllers/admin/getAllCompany.js";
import { getCompany } from "../controllers/admin/getCompany.js";
import { getAllJob } from "../controllers/admin/getAllJob.js";
import { getJob } from "../controllers/admin/getJob.js";
import { getAllJobProposal } from "../controllers/admin/getAllJobProposal.js";
import { getAllReport } from "../controllers/admin/getAllReport.js";
import { getReport } from "../controllers/admin/getReport.js";
import { getJobSeeker } from "../controllers/admin/getJobSeeker.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { getAllJobSeeker } from "../controllers/admin/getAllJobSeekers.js";
import verifyMiddleware from "../middleware/userVerify.js";
import { getDashboardData } from '../controllers/admin/adminDashBoard.js'
const router = express.Router();

/**
 * 📝 User management
 */
router.put("/users/:userId/deactivate", verifyAdmin, deactivateUser);
router.delete("/users/:userId", verifyAdmin, deleteUser);

/**
 * 📝 Companies
 */
router.get("/companies", verifyMiddleware, verifyAdmin, getAllCompany);
router.get("/companies/:id", verifyMiddleware, verifyAdmin, getCompany);

/**
 * 📝 Jobs
 */
router.get("/jobs", verifyMiddleware, verifyAdmin, getAllJob);
router.get("/jobs/:id", verifyMiddleware, verifyAdmin, getJob);

/**
 * 📝 Job Seekers
 */
router.get('/jobseekers', verifyMiddleware, verifyAdmin, getAllJobSeeker);
router.get("/jobseekers/:id", verifyMiddleware, verifyAdmin, getJobSeeker);

/**
 * 📝 Job Proposals
 */
router.get("/jobproposals", verifyMiddleware, verifyAdmin, getAllJobProposal);

router.get("/dashboard",verifyMiddleware,verifyAdmin,getDashboardData);
/**
 * 📝 Reports
 */
router.get("/reports", verifyMiddleware, verifyAdmin, getAllReport);
router.get("/reports/:id", verifyMiddleware, verifyAdmin, getReport);

export default router;
