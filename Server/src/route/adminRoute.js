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

const router = express.Router();

/**
 * 📝 User management
 */
router.put("/users/:userId/deactivate", deactivateUser);
router.delete("/users/:userId", deleteUser); 

/**
 * 📝 Companies
 */
router.get("/companies", getAllCompany);
router.get("/companies/:id", getCompany);

/**
 * 📝 Jobs
 */
router.get("/jobs", getAllJob);
router.get("/jobs/:id", getJob);

/**
 * 📝 Job Seekers
 */
router.get("/jobseekers/:id", getJobSeeker); 

/**
 * 📝 Job Proposals
 */
router.get("/jobproposals", getAllJobProposal); 

/**
 * 📝 Reports
 */
router.get("/reports", getAllReport);
router.get("/reports/:id", getReport);

export default router;
