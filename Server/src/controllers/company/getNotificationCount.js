import Notification from "../../models/notification.js";
import Company from "../../models/company.js";

export const getNotificationCount = async (req, res) => {
    try {
        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }
        const notifications = await Notification.countDocuments({ recipientId: company._id, recipientModel: 'Company', isRead: false })
        res.status(200).json({
            message: "Notifications retrieved successfully.",
            data: notifications
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
        console.error("Error retrieving notifications:", error);
    }
}