import Notification from "../../models/notification.js";
import JobSeeker from "../../models/jobSeeker.js";

export const deleteNotification = async (req, res) => {
    try {
        const { notificationIds } = req.body;
        if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
            return res.status(400).json({ message: "No notification IDs provided." });
        }
        const jobSeekerId = req.jobSeeker._id || req.jobSeeker;
        if (!jobSeekerId) {
            return res.status(400).json({ message: "JobSeeker information is missing." });
        }

        const jobSeeker = await JobSeeker.findById(jobSeekerId);

        if (!jobSeeker) {
            return res.status(404).json({ message: "JobSeeker not found." });
        }

        await Notification.deleteMany(
            { _id: { $in: notificationIds }, recipientId: jobSeeker._id, recipientModel: 'JobSeeker' }
        );
        res.status(200).json({ message: "Notifications deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
        console.error("Error deleting notification:", error);
    }
}