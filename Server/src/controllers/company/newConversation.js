import Conversation from "../../models/conversation.js";
import Company from "../../models/company.js";
import JobSeeker from "../../models/jobSeeker.js";

/**
 * POST /api/conversations
 * Body: { jobId: "...", jobSeekerId: "..." }
 * Only a logged-in Company may call this.
 */
export const createConversation = async (req, res) => {
    try {
        const { jobId, jobSeekerId } = req.body;
        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }

        if (!jobId || !jobSeekerId) {
            return res.status(400).json({ message: "jobId and jobSeekerId are required" });
        }

        // ✅ verify logged-in user is a Company
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(403).json({ message: "Only companies can create conversations" });
        }

        // ✅ verify jobseeker exists
        const jobSeeker = await JobSeeker.findById(jobSeekerId).select("_id");
        if (!jobSeeker) {
            return res.status(404).json({ message: "JobSeeker not found" });
        }

        // ✅ check if conversation already exists
        let conversation = await Conversation.findOne({
            jobId,
            companyId: company._id,
            jobSeekerId: jobSeeker._id,
        });

        if (conversation) {
            return res.status(200).json(conversation._id);
        }

        // ✅ create new conversation
        conversation = new Conversation({
            jobId,
            companyId: company._id,
            jobSeekerId: jobSeeker._id,
            lastMessage: {
                text: "",
                senderId: null,
                senderModel: "Company",
                sentAt: null,
                isRead: false,
            },
        });

        await conversation.save();

        return res.status(201).json(conversation);
    } catch (error) {
        console.error("Error creating conversation:", error);
        return res.status(500).json({ message: "Failed to create conversation" });
    }
};
