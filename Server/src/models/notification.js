import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'senderModel',
        required: true
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['JobSeeker', 'Company']
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'recipientModel',
        required: true
    },
    recipientModel: {
        type: String,
        required: true,
        enum: ['JobSeeker', 'Company']
    },
    type: {
        type: String,
        enum: ['application', 'message', 'status', 'other'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    link: {
        type: String,
        default: null,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;