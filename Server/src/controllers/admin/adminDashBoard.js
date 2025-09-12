// controllers/adminController.js
import Job from "../../models/job.js";
import Company from "../../models/company.js";
import JobSeeker from "../../models/jobSeeker.js";
import Report from "../../models/report.js";

export const getDashboardData = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const totalJobSeekers = await JobSeeker.countDocuments();
    const totalReports = await Report.countDocuments();

    // full populate (no field selection here)
    const reports = await Report.find()
      .sort({ createdAt: -1 })
      .limit(7)
      .populate('reporter')       
      .populate('reportedUser');

    const latestReports = reports.map(r => {
      let reporterData = {};
      if (r.reporterModel === 'User') {
        reporterData = {
          name: r.reporter?.name,
          email: r.reporter?.email
        };
      } else if (r.reporterModel === 'JobSeeker') {
        reporterData = {
          name: r.reporter?.fullName,
          email: r.reporter?.user?.email
        };
      } else if (r.reporterModel === 'Company') {
        reporterData = {
          name: r.reporter?.companyName,
          email: r.reporter?.user?.email
        };
      }

      let reportedUserData = {};
      if (r.reportedUserModel === 'User') {
        reportedUserData = {
          name: r.reportedUser?.name,
          email: r.reportedUser?.email
        };
      } else if (r.reportedUserModel === 'JobSeeker') {
        reportedUserData = {
          name: r.reportedUser?.fullName,
          email: r.reportedUser?.user?.email
        };
      } else if (r.reportedUserModel === 'Company') {
        reportedUserData = {
          name: r.reportedUser?.companyName,
          email: r.reportedUser?.user?.email
        };
      }

      return {
        _id: r._id,
        reason: r.reason,
        details: r.details,
        status: r.status,
        createdAt: r.createdAt,
        reporter: reporterData,
        reportedUser: reportedUserData
      };
    });

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

