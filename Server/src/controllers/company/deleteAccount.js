import Company from "../../models/company.js";
import User from "../../models/user.js";
import Notification from "../../models/notification.js";
import Job from "../../models/job.js";
import JobProposal from "../../models/jobProposal.js";


export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const company = await Company.findOne({ user: userId });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }



        await Company.findOneAndDelete({ user: userId });
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
    }
}