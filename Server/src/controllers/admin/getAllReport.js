// controllers/adminController.js
import Report from "../../models/report.js";

export const getAllReport = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporter")
      .populate("reportedUser");

    const formattedReports = reports.map(r => {
      // Handle reporter
      let reporterData = {};
      if (r.reporterModel === "User") {
        reporterData = {
          name: r.reporter?.name,
          email: r.reporter?.email,
        };
      } else if (r.reporterModel === "JobSeeker") {
        reporterData = {
          name: r.reporter?.fullName,
        };
      } else if (r.reporterModel === "Company") {
        reporterData = {
          name: r.reporter?.companyName,
        };
      }

      let reportedUserData = {};
      if (r.reportedUserModel === "User") {
        reportedUserData = {
          name: r.reportedUser?.name,
          email: r.reportedUser?.email,
        };
      } else if (r.reportedUserModel === "JobSeeker") {
        reportedUserData = {
          name: r.reportedUser?.fullName,
        };
      } else if (r.reportedUserModel === "Company") {
        reportedUserData = {
          name: r.reportedUser?.companyName,
        };
      }

      return {
        _id: r._id,
        reason: r.reason,
        details: r.details,
        status: r.status,
        createdAt: r.createdAt,
        reporterModel: r.reporterModel,
        reportedUserModel: r.reportedUserModel,
        reporter: reporterData,
        reportedUser: reportedUserData,
      };
    });

    res.status(200).json({
      message: "Reports fetched successfully",
      data: formattedReports,
    });
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
