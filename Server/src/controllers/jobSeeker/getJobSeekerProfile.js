import JobSeeker from "../../models/jobSeeker.js";

export const getJobSeekerProfile = async (req, res) => {
    try {
        const jobSeekerId = req.jobSeeker._id || req.jobSeeker;
        if (!jobSeekerId) {
            return res.status(400).json({ message: "JobSeeker information is missing." });
        }

        const jobSeeker = await JobSeeker.findById(jobSeekerId)
            .populate('user', 'name email role createdAt')
            .populate({
                path: 'jobsApplied',
                populate: { path: 'company', select: 'name industry location' }
            });

        if (!jobSeeker) {
            return res.status(404).json({ message: "JobSeeker not found." });
        }

        res.status(200).json({
            message: "JobSeeker profile retrieved successfully.",
            jobSeeker
        });
    } catch (error) {
        console.error("Error retrieving JobSeeker profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}