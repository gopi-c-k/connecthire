import JobSeeker from "../../models/jobSeeker.js";
import User from "../../models/user.js";
import Notification from "../../models/notification.js";
import JobProposal from "../../models/jobProposal.js";
import Conversation from "../../models/conversation.js";
import Message from "../../models/message.js";

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const jobSeeker = await JobSeeker.findOne({ user: userId });
    if (jobSeeker) {
      await Notification.deleteMany({ recipientId: jobSeeker._id });
      await Notification.deleteMany({ senderId: jobSeeker._id });
      await JobProposal.deleteMany({ jobSeeker: jobSeeker._id });
      await jobSeeker.deleteOne();
    }

    let conversations = [];
    if (jobSeeker) {
      conversations = await Conversation.find({ jobSeekerId: jobSeeker._id });
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
