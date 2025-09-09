import Message from "../../models/message.js";
import JobSeeker from "../../models/jobSeeker.js";
import Company from "../../models/company.js";

export const getMessage = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const userId = req.user.userId; // from your auth middleware

    // 🔎 find out if this user is jobseeker or company
    const jobSeeker = await JobSeeker.findOne({ user: userId }).select("_id");
    const company = await Company.findOne({ user: userId }).select("_id");

    if (!jobSeeker && !company) {
      return res.status(403).json({ message: "User is not allowed to view messages" });
    }

    let oppositeSenderIdsQuery;
    if (jobSeeker) {
      // logged in as jobseeker → mark messages sent by company
      oppositeSenderIdsQuery = { senderModel: "Company" };
    } else if (company) {
      // logged in as company → mark messages sent by jobseeker
      oppositeSenderIdsQuery = { senderModel: "JobSeeker" };
    }

    // 1️⃣ Mark unread messages from opposite party as read
    await Message.updateMany(
      { conversationId, isRead: false, ...oppositeSenderIdsQuery },
      { $set: { isRead: true } }
    );

    // 2️⃣ Fetch all messages (now updated)
    const messages = await Message.find({ conversationId })
      .sort({ sentAt: 1 })
      .lean();

    // 3️⃣ Map to simpler response
    const formatted = messages.map((m) => ({
      _id: m._id,
      conversationId: m.conversationId,
      senderId: m.senderId,
      senderModel: m.senderModel,
      messageText: m.messageText,
      isRead: m.isRead,
      sentAt: m.sentAt,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Failed to get messages" });
  }
};
