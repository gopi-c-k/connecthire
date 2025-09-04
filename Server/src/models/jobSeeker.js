import mongoose from 'mongoose';

const JobSeekerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  profilePicture: {
    type: String, // URL for profile picture
    default: ''
  },
  resume: {
    type: String, // URL or file path to resume
  },
  bio: {
    type: String,
    maxlength: 500
  },
  contact: {
    phone: String,
    address: String,
    linkedin: String,
    portfolio: String,
  },
  skills: {
    type: [String],
    default: []
  },
  experience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String
    }
  ],
  education: [
    {
      degree: String,
      institution: String,
      year: Number
    }
  ],
  jobsApplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  certifications: [
    {
      title: String,
      issuer: String,
      year: Number
    }
  ],
  availability: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Freelance', 'Internship'],
    default: 'Full-Time'
  }
}, { timestamps: true });

const JobSeeker = mongoose.model('JobSeeker', JobSeekerSchema);
export default JobSeeker;
