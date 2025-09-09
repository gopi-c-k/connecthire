import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import Company from '../models/company.js';
import JobSeeker from '../models/jobSeeker.js';
import Conversation from '../models/conversation.js';

export const verifyMsg = asyncHandler(async (req, res, next) => {
    // check that user exists
    const user = await User.findById(req.user.userId);
    if (!user) {
        return res.status(404).json({ message: 'Invalid user' });
    }

    // find company or jobseeker profile
    const company = await Company.findOne({ user: user._id });
    const jobSeeker = await JobSeeker.findOne({ user: user._id });

    // get conversation
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
    }

    // verify ownership
    if (jobSeeker) {
        if (conversation.jobSeekerId.toString() !== jobSeeker._id.toString()) {
            return res.status(403).json({ message: 'You are not part of this conversation' });
        }
    } else if (company) {
        if (conversation.companyId.toString() !== company._id.toString()) {
            return res.status(403).json({ message: 'You are not part of this conversation' });
        }
    } else {
        return res.status(403).json({ message: 'No valid profile found for this user' });
    }

    // attach conversation if you want downstream handlers to use it
    req.conversation = conversation;

    next(); // ✅ pass control to the next middleware/route
});
