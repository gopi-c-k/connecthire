import JobSeeker from "../../models/jobSeeker.js";

/**
 * @desc    Update JobSeeker privacy settings
 * @route   PUT /jobseeker/privacy-settings
 * @access  Private
 */
export const updatePrivacySettings = async (req, res) => {
  try {
    const { profileVisibility, jobPreferences, messageAllowed, viewResume } = req.body;
    const jobSeekerId = req.jobSeeker?._id || req.jobSeeker;
    if (!jobSeekerId) {
      return res.status(400).json({ message: "JobSeeker information is missing." });
    }

    // Fetch jobseeker
    const jobSeeker = await JobSeeker.findById(jobSeekerId);
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker not found." });
    }

    // Update only provided fields (optional chaining)
    if (profileVisibility !== undefined) jobSeeker.profileVisibility = profileVisibility;
    if (jobPreferences !== undefined) jobSeeker.jobPreferences = jobPreferences;
    if (messageAllowed !== undefined) jobSeeker.messageAllowed = messageAllowed;
    if (viewResume !== undefined) jobSeeker.viewResume = viewResume;

    await jobSeeker.save();

    return res.status(200).json({
      message: "Privacy settings updated successfully",
      privacySettings: {
        profileVisibility: jobSeeker.profileVisibility,
        jobPreferences: jobSeeker.jobPreferences,
        messageAllowed: jobSeeker.messageAllowed,
        viewResume: jobSeeker.viewResume,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @desc    Get JobSeeker privacy settings
 * @route   GET /jobseeker/privacy-settings
 * @access  Private
 */
export const getPrivacySettings = async (req, res) => {
  try {
    const jobSeekerId = req.jobSeeker?._id || req.jobSeeker;
    if (!jobSeekerId) {
      return res.status(400).json({ message: "JobSeeker information is missing." });
    }

    // Fetch jobseeker
    const jobSeeker = await JobSeeker.findById(jobSeekerId);
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker not found." });
    }

    // Return only the privacy settings fields
    return res.status(200).json({
      profileVisibility: jobSeeker.profileVisibility,
      jobPreferences: jobSeeker.jobPreferences,
      messageAllowed: jobSeeker.messageAllowed,
      viewResume: jobSeeker.viewResume,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
