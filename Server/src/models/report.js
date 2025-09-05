import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'reporterModel'
    },
    reporterModel: {
        type: String,
        required: true,
        enum: ['User', 'JobSeeker', 'Company']
    },
    reportedUser: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'reporterModel',
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Resolved', 'Dismissed'],
        default: 'Pending'
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model('Report', reportSchema);
export default Report;
