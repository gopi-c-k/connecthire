// models/job.js
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salaryRange: {
    min: Number,
    max: Number
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
    default: 'full-time'
  },
  requirements: [String],
  postedAt: {
    type: Date,
    default: Date.now
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobSeeker'
  }],
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  }
});

const Job = mongoose.model('Job', JobSchema);
export default Job;
