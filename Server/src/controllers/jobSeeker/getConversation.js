import JobSeeker from "../../models/jobSeeker.js";
import Conversation from "../../models/conversation.js";

export const getConversationForJobSeeker = async (req, res) => {
    try {
        const jobSeekerId = req.jobSeeker._id || req.jobSeeker;

        if (!jobSeekerId) {
            return res.status(400).json({ message: "JobSeeker information is missing." });
        }

        const jobSeeker = await JobSeeker.findById(jobSeekerId).select("_id");
        if (!jobSeeker) {
            return res.status(404).json({ message: "JobSeeker not found" });
        }

        const conversations = await Conversation.find({ jobSeekerId: jobSeeker._id })
            .populate("companyId", "companyName companyLogo")
            .populate("jobId", "title")
            .sort({ 'lastMessage.sentAt': -1 })
            .lean();

        return res.status(200).json(conversations);
    } catch (error) {
        console.error("Error fetching jobseeker conversations:", error);
        return res.status(500).json({ message: "Failed to get conversations" });
    }
};
