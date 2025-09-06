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
    github: String,
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
      years: String,
    }
  ],
  education: [
    {
      degree: String,
      institution: String,
      years: Number
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
  raisedReports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }],
  availability: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Freelance', 'Internship'],
    default: 'Full-Time'
  },
  profileVisibility: {
    type: String,
    enum: [
      'Public',
      'Private',
      'Recruiters Only'
    ],
    default: "Public"
  },
  messageAllowed: {
    type: String,
    enum: ["Anyone", 'Nobody', 'Recruiters Only'],
    default: "Anyone"
  },
  jobPreferences: {
    type: String,
    enum: ['Onsite', 'Hybrid', 'Remote'],
    default: "Onsite"
  },
  viewResume :{
    type : Boolean,
    default: false
  }
}, { timestamps: true });

const JobSeeker = mongoose.model('JobSeeker', JobSeekerSchema);
export default JobSeeker;
