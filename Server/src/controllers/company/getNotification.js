import Notification from "../../models/notification.js";
import Company from "../../models/company.js";

export const getNotifications = async (req, res) => {
    try {
        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }
        const notifications = await Notification.find({ recipientId: company._id, recipientModel: 'Company' })
            .sort({ createdAt: -1 })
            .limit(50);
        res.status(200).json({
            message: "Notifications retrieved successfully.",
            data: notifications
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
        console.error("Error retrieving notifications:", error);
    }
}