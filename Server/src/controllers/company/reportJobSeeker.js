import Company from "../../models/company.js";
import Report from "../../models/report.js";
import JobSeeker from "../../models/jobSeeker.js";

export const reportJobSeeker = async (req, res) => {
  try {
    const { id, reason, details } = req.body;
    const reporterId = req.companyId || req.company?._id;
    if (!reporterId) {
      return res.status(401).json({ message: "Unauthorized. Company login required." });
    }

    const company = await Company.findById(reporterId);
    if (!company) {
      return res.status(400).json({ message: "Company information is missing." });
    }

    if (!id || !reason) {
      return res.status(400).json({ message: "Job seeker ID and reason are required." });
    }

    const jobSeeker = await JobSeeker.findById(id);
    if (!jobSeeker) {
      return res.status(404).json({ message: "Job seeker not found." });
    }

    // Create the new report (dynamic reference)
    const newReport = new Report({
      reporter: reporterId,
      reporterModel: "Company",    
      reportedUser: id,
      reportedUserModel: 'JobSeeker',
      reason,
      details
    });

    await newReport.save();

    company.raisedReports.push(newReport._id);
    await company.save();

    res.status(200).json({ message: "Job seeker reported successfully." });
  } catch (error) {
    console.error("Error reporting job seeker:", error);
    res.status(500).json({ message: "Server error while reporting job seeker." });
  }
};
