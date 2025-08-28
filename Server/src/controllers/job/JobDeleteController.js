import Job from "../../models/job.js";
import Company from "../../models/company.js";

export const deleteJob = async (req, res) => {
    try {
        const companyId = req.companyId || req.company?._id;

        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }
        if (req.companyId && job.company.toString() !== req.companyId.toString()) {
            return res.status(403).json({ message: "You do not have permission to update this job." });
        }
        const deleteJob = await Job.findOneAndDelete({ _id: id, company: companyId });
        if (!deleteJob) {
            return res.status(404).json({ message: "Job not found or you do not have permission to delete this job." });
        }
        res.status(200).json({ message: "Job deleted successfully." });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}