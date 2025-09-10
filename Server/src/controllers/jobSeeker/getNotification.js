import Notification from "../../models/notification.js";
import JobSeeker from "../../models/jobSeeker.js";

export const getNotifications = async (req, res) => {
    try {
        const jobSeekerId = req.jobSeeker._id || req.jobSeeker;
        if (!jobSeekerId) {
            return res.status(400).json({ message: "JobSeeker information is missing." });
        }

        const jobSeeker = await JobSeeker.findById(jobSeekerId);

        if (!jobSeeker) {
            return res.status(404).json({ message: "JobSeeker not found." });
        }
        const notifications = await Notification.find({ recipientId: jobSeeker._id, recipientModel: 'JobSeeker' })
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