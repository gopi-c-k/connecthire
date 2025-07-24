// models/jobSeeker.js
const mongoose = require('mongoose');

const JobSeekerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resume: {
    type: String // URL or file path to resume
  },
  skills: [String],
  experience: {
    type: Number, 
    default: 0
  },
  education: {
    degree: String,
    institution: String,
    year: Number
  },
  jobsApplied: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job' 
    }]
});

module.exports = mongoose.model('JobSeeker', JobSeekerSchema);
