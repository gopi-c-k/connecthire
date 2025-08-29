import JobProposal from "../../models/jobProposal.js";
import Job from "../../models/job.js";
import JobSeeker from "../../models/jobSeeker.js";

export const applyToJob = async (req, res) => {
  try {
    const { coverLetter, proposedRate } = req.body;
    const jobSeekerId = req.jobSeeker._id || req.jobSeeker;
    const { jobId } = req.params;

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    if(job.status !== 'open') {
      return res.status(400).json({ message: "Job is not open for applications" });
    }

    const companyId = job.company; // Assuming 'postedBy' field in Job model refers to the company
    if (!companyId) {
      return res.status(400).json({ message: "Job does not have a valid company associated" });
    }
    // Check if the job seeker exists
    const jobSeeker = await JobSeeker.findById(jobSeekerId);
    if (!jobSeeker) {
      return res.status(404).json({ message: "Job seeker not found" });
    }

    // Check if the job seeker has already applied to this job
    const existingProposal = await JobProposal.findOne({ job: jobId, jobSeeker: jobSeekerId });
    if (existingProposal) {
      return res.status(400).json({ message: "You have already applied to this job" });
    }

    // Create a new job proposal
    const newProposal = new JobProposal({
      job: jobId,
      jobSeeker: jobSeekerId,
      coverLetter,
      company: companyId,
      proposedRate
    });

    await newProposal.save();
    jobSeeker.jobsApplied.push(newProposal._id);
    await jobSeeker.save();
    job.applicants.push(newProposal._id);
    await job.save();

    res.status(201).json({ message: "Application submitted successfully", proposal: newProposal });
  } catch (error) {
    console.error("Error applying to job:", error);
    res.status(500).json({ message: "Server error" });
  }
};