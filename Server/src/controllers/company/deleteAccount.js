import Company from "../../models/company.js";
import User from "../../models/user.js";
import Notification from "../../models/notification.js";
import Job from "../../models/job.js";
import JobProposal from "../../models/jobProposal.js";
import Conversation from "../../models/conversation.js";
import Message from "../../models/message.js";

export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const company = await Company.findOne({ user: userId });

        let jobs = [];
        if (company) {
            jobs = await Job.find({ company: company._id });
        }

        for (const job of jobs) {
            await JobProposal.deleteMany({ job: job._id });
            await job.deleteOne();
        }

        if (company) {
            await Notification.deleteMany({ recipientId: company._id });
            await Notification.deleteMany({ senderId: company._id });
            await Company.findOneAndDelete({ user: userId });
        }
        let conversations = [];
        if (company) {
            conversations = await Conversation.find({ companyId: company._id });
        }
        for (const convo of conversations) {
            await Message.deleteMany({ conversationId: convo._id });
            await convo.deleteOne();
        }
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
