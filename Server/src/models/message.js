import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'senderModel',
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now,
    },
    messageText: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['JobSeeker', 'Company']
    }
})

const Message = new mongoose.model('Message', MessageSchema);
export default Message;