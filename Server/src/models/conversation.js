import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    jobSeekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSeeker',
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastMessage: {
        text: String,
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'lastMessage.senderModel' // dynamic ref
        },
        senderModel: {
            type: String,
            enum: ['JobSeeker', 'Company']
        },
        sentAt: Date,
        isRead: Boolean
    }
})

const Conversation = new mongoose.model('Conversation', ConversationSchema);
export default Conversation;