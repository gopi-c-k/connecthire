import Job from "../../models/job.js";
import JobProposal from "../../models/jobProposal.js";

export const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate("company");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const proposals = await JobProposal.find({ job: id })
      .populate("jobSeeker") // full job seeker profile

    return res.status(200).json({
      message: "Job fetched successfully",
      data: {
        job,
        proposals
      }
    });
  } catch (err) {
    console.error("Error fetching job:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
