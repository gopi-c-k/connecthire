import JobSeeker from "../../models/jobSeeker.js";
import Company from "../../models/company.js";

export const getJobSeekerProfile = async (req, res) => {
  try {
    const { jobSeekerId } = req.params;
    const companyId = req.companyId || req.company?._id;

    if (!jobSeekerId) {
      return res.status(400).json({ message: "JobSeeker information is missing." });
    }

    // Fetch job seeker profile including visibility + messaging fields
    const jobSeeker = await JobSeeker.findById(jobSeekerId)
      .select(
        "fullName profilePicture resume bio contact skills experience education certifications profileVisibility messageAllowed jobsApplied"
      )
      .populate("user", "name email role createdAt")
      .populate({
        path: "jobsApplied",
        populate: { path: "company", select: "name industry location" },
      });

    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker not found." });
    }

    // Public profiles are always visible
    if (jobSeeker.profileVisibility === "public") {
      return res.status(200).json({
        message: "JobSeeker profile retrieved successfully.",
        messageAllow:
          jobSeeker.messageAllowed === "anyone" ||
          jobSeeker.messageAllowed === "recruiters",
        jobSeeker,
      });
    }

    // If requester is a company
    if (companyId) {
      const company = await Company.findById(companyId);

      if (company) {
        // Profile visible to recruiters
        if (jobSeeker.profileVisibility === "recruiters") {
          return res.status(200).json({
            message: "JobSeeker profile retrieved successfully.",
            messageAllow: jobSeeker.messageAllowed === "recruiters",
            jobSeeker,
          });
        }

        // If this company is among jobSeeker’s applied jobs
        const appliedToThisCompany = jobSeeker.jobsApplied.some(
          (application) =>
            application.company &&
            application.company._id.toString() === company._id.toString()
        );

        if (appliedToThisCompany) {
          return res.status(200).json({
            message: "JobSeeker profile retrieved successfully.",
            messageAllow: jobSeeker.messageAllowed === "recruiters",
            jobSeeker,
          });
        }

        return res.status(403).json({ message: "This is a private account." });
      }
    }

    // If not a company and not the same jobseeker:
    return res.status(403).json({ message: "This is a private account." });
  } catch (error) {
    console.error("Error retrieving JobSeeker profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
