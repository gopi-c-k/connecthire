import JobProposal from '../../models/jobProposal.js';

export const getJobProposals = async (req, res) => {
  try {
    const jobSeekerId = req.jobSeeker._id || req.jobSeeker;

    // Fetch all job proposals for the logged-in job seeker
    const proposals = await JobProposal.find({ jobSeeker: jobSeekerId })
      .populate('job','_id title description') // Populate job details
      .populate('company', 'companyName companyLogo'); // Populate job seeker details (only name and email)

    res.status(200).json({ proposals });
  } catch (error) {
    console.error("Error fetching job proposals:", error);
    res.status(500).json({ message: "Server error" });
  }
};