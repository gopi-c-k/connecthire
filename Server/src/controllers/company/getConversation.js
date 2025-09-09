import Conversation from "../../models/conversation.js";
import Company from "../../models/company.js";

export const getCompanyConversation = async (req, res) => {
    try {
        let companyId = req.companyId || req.company?._id;

        const company = await Company.findById(companyId)

        if (!company) {
            return res.status(401).json({ message: "Not authorized" })
        }

        const conversations = await Conversation.find({ companyId })
            .populate("jobSeekerId", "fullName profilePicture")
            .populate("jobId", "title") 
            .sort({ 'lastMessage.sentAt': -1 })
            .lean();

        // 3️⃣ Return them
        return res.status(200).json(conversations);
    } catch (error) {
        console.error("Error fetching company conversations:", error);
        return res.status(500).json({ message: "Failed to get company conversations" });
    }
};
