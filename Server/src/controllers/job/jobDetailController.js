import Job from "../../models/job.js";

export const JobDetailsController = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findOne({ _id: id }).populate('company', '_id companyName companyLogo location industry');
        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }
        res.status(200).json(job);
    }
    catch (error) {
        console.error("Error fetching job details:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}