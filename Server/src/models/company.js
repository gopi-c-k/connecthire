// models/company.js
const mongoose = require('mongoose');

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
  jobsPosted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job' 
  }]
});

module.exports = mongoose.model('Company', CompanySchema);
