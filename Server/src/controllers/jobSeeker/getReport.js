import Report from "../../models/report.js";
import JobSeeker from "../../models/jobSeeker.js";

export const getReports = async (req, res) => {
  try {
    const jobSeekerId = req.jobSeeker?._id || req.jobSeeker;
    if (!jobSeekerId) {
      return res
        .status(400)
        .json({ message: "JobSeeker information is missing." });
    }

    // Validate job seeker
    const jobSeeker = await JobSeeker.findById(jobSeekerId);
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker not found." });
    }
    const reports = await Report.find({ reporter: jobSeeker._id })
      .populate("reportedUser",'companyName')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Could not fetch reports.",
    });
  }
};
