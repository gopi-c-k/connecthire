import Message from "../../models/message.js";
import Conversation from "../../models/conversation.js";
import Company from "../../models/company.js";
import JobSeeker from "../../models/jobSeeker.js";
import User from '../../models/user.js';
/**
 * POST a new message into a conversation
 */
export const postMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { messageText } = req.body;
    const user = await User.findById(req.user.userId);
    if (!messageText || !messageText.trim()) {
      return res.status(400).json({ message: "Message text is required" });
    }


    // find company or jobseeker profile
    const company = await Company.findOne({ user: user._id });
    const jobSeeker = await JobSeeker.findOne({ user: user._id });

    let senderId = "";
    let senderModel = "";

    if (jobSeeker) {
      senderId = jobSeeker._id;
      senderModel = 'JobSeeker';
    } else if (company) {
      senderId = company._id;
      senderModel = 'Company';
    }
    // Make sure conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Create new message
    const newMessage = new Message({
      conversationId,
      senderId,
      senderModel,
      messageText,
      isRead: false, // by default
    });

    await newMessage.save();

    // Update lastMessage field in Conversation for quick listing
    conversation.lastMessage = {
      text: messageText,
      senderId: senderId,
      sentAt: new Date(),
      isRead: false,
    };
    await conversation.save();

    return res.status(201).json({
      _id: newMessage._id,
      conversationId: newMessage.conversationId,
      senderId: newMessage.senderId,
      senderModel: newMessage.senderModel,
      messageText: newMessage.messageText,
      isRead: newMessage.isRead,
      sentAt: newMessage.sentAt,
    });
  } catch (error) {
    console.error("Error posting message:", error);
    return res.status(500).json({ message: "Failed to post message" });
  }
};
