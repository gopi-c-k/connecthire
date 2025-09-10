import Notification from "../../models/notification.js";
import Company from "../../models/company.js";

export const deleteNotification = async (req, res) => {
    try {
        const { notificationIds } = req.body;
        if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
            return res.status(400).json({ message: "No notification IDs provided." });
        }
        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }

        await Notification.deleteMany(
            { _id: { $in: notificationIds }, recipientId: company._id, recipientModel: 'Company' }
        );
        res.status(200).json({ message: "Notifications deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
        console.error("Error deleting notification:", error);
    }
}