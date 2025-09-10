// controllers/adminController.js
import Job from "../../models/job.js";
import Company from "../../models/company.js";
import JobSeeker from "../../models/jobSeeker.js";
import Report from "../../models/report.js";

// GET /admin/dashboard
export const getDashboardData = async (req, res) => {
  try {
    // Get total counts
    const totalJobs = await Job.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const totalJobSeekers = await JobSeeker.countDocuments();
    const totalReports = await Report.countDocuments();

    // Get latest reports (limit 7)
    const latestReports = await Report.find()
      .sort({ createdAt: -1 })
      .limit(7)
      .populate('reporter', 'name email')
      .populate('reportedUser', 'name email companyName'); // depending on type

    res.status(200).json({
      totalJobs,
      totalCompanies,
      totalJobSeekers,
      totalReports,
      latestReports
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
