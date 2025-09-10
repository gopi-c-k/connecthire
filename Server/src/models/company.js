// models/job.js
import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  description: {
    type: String
  },
  companyLogo: {
    type: String
  },
  location: {
    type: String
  },
  industry: String,
  size: String,
  founded: Number,
  contactEmail: String,
  socialLinks: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  jobsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  raisedReports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }],
  showInSearchResults: { type: Boolean, default: true },
  allowApplicantsToMessage: { type: Boolean, default: true },
  receiveEmailNotifications: { type: Boolean, default: true },
  allowAnonymizedDataSharing: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
});

const Company = mongoose.model('Company', CompanySchema);
export default Company;