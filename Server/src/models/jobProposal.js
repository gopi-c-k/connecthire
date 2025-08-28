import mongoose from "mongoose";

const jobProposalSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobSeeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobSeeker',
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  coverLetter: {
    type: String,
    maxlength: 2000
  },
  proposedRate: {
    type: Number,
    min: 0
  },
  status: {
    type: String,
    enum: ['applied', 'accepted', 'rejected', 'shortlisted', 'hired', 'interviewed'],
    default: 'applied'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const JobProposal = mongoose.model('JobProposal', jobProposalSchema);
export default JobProposal;