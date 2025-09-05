import Company from "../../models/company.js";
import Report from "../../models/report.js";
import JobSeeker from "../../models/jobSeeker.js";

export const reportCompany = async (req, res) => {
  try {
    const { companyId, reason, details } = req.body;


    const reporterId = req.jobSeeker?._id || req.jobSeeker;
    if (!reporterId) {
      return res.status(401).json({ message: "Unauthorized. Job Seeker login required." });
    }

    const jobSeeker = await JobSeeker.findById(reporterId);
    if (!jobSeeker) {
      return res.status(400).json({ message: "Job Seeker information is missing." });
    }

    if (!companyId || !reason) {
      return res.status(400).json({ message: "Company ID and reason are required." });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    // Create the new report (dynamic reference)
    const newReport = new Report({
      reporter: reporterId,
      reporterModel: "JobSeeker",    
      reportedUser: companyId,
      reason,
      details
    });

    await newReport.save();

    jobSeeker.raisedReports.push(newReport._id);
    await jobSeeker.save();

    res.status(200).json({ message: "Company reported successfully." });
  } catch (error) {
    console.error("Error reporting job seeker:", error);
    res.status(500).json({ message: "Server error while reporting job seeker." });
  }
};
