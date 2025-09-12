import JobSeeker from "../../models/jobSeeker.js";
import User from "../../models/user.js";
import Notification from "../../models/notification.js";
import JobProposal from "../../models/jobProposal.js";
import Conversation from "../../models/conversation.js";
import Message from "../../models/message.js";
import Company from "../../models/company.js";
import Job from "../../models/job.js";

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(404).json({ message: "User not found" });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === 'company') {
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
    } else if (user.role === 'jobseeker') {
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
    }
    const delUser = await User.findByIdAndDelete(userId);
    if (!delUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
