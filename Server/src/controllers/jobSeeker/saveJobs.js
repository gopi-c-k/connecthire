import JobSeeker from "../../models/jobSeeker.js";
import Job from "../../models/job.js";

export const saveJob = async (req, res) => {
    try {
        const jobSeekerId = req.jobSeeker?._id || req.jobSeeker; // safer optional chaining
        const { jobId } = req.params;

        if (!jobSeekerId) {
            return res
                .status(400)
                .json({ message: "JobSeeker information is missing." });
        }

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required." });
        }

        // fetch jobseeker
        const jobSeeker = await JobSeeker.findById(jobSeekerId);
        if (!jobSeeker) {
            return res.status(404).json({ message: "JobSeeker not found." });
        }

        // check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }

        // check if already saved
        if (jobSeeker.savedJobs.includes(jobId)) {
            return res.status(400).json({ message: "Job already saved." });
        }

        // save the job
        jobSeeker.savedJobs.push(jobId);
        await jobSeeker.save();

        res.status(200).json({ message: "Job saved successfully." });
    } catch (error) {
        console.error("Error in saveJob:", error);
        res.status(500).json({ message: "Server error." });
    }
}


export const getSavedJobs = async (req, res) => {
  try {
    const jobSeekerId = req.jobSeeker?._id || req.jobSeeker; 
    if (!jobSeekerId) {
      return res
        .status(400)
        .json({ message: "JobSeeker information is missing." });
    }

    // fetch jobseeker
    const jobSeeker = await JobSeeker.findById(jobSeekerId);
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker not found." });
    }

    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // saved job IDs
    const savedJobIds = jobSeeker.savedJobs || [];

    // count total saved jobs (status: open)
    const totalJobs = await Job.countDocuments({
      _id: { $in: savedJobIds },
      status: "open",
    });

    // fetch paginated saved jobs
    const savedJobs = await Job.find({
      _id: { $in: savedJobIds },
      status: "open",
    })
      .select("title duration location skills status postedAt") 
      .populate("company", "companyName companyLogo") 
      .sort({ postedAt: -1 }) 
      .skip(skip) 
      .limit(limit); 

    
    res.status(200).json({
      savedJobs,
      pagination: {
        totalJobs,
        page,
        limit,
        totalPages: Math.ceil(totalJobs / limit),
      },
    });
  } catch (error) {
    console.error("Error in getSavedJobs:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const unsaveJob = async (req, res) => {
    try {
        const jobSeekerId = req.jobSeeker?._id || req.jobSeeker; 
        const { jobId } = req.params;

        if (!jobSeekerId) {
            return res
                .status(400)
                .json({ message: "JobSeeker information is missing." });
        }

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required." });
        }

        // fetch jobseeker
        const jobSeeker = await JobSeeker.findById(jobSeekerId);
        if (!jobSeeker) {
            return res.status(404).json({ message: "JobSeeker not found." });
        }

        // check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found." });
        }

        // check if job is saved
        if (!jobSeeker.savedJobs.includes(jobId)) {
            return res.status(400).json({ message: "Job is not in saved list." });
        }

        // unsave the job
        jobSeeker.savedJobs = jobSeeker.savedJobs.filter(
            (savedJobId) => savedJobId.toString() !== jobId
        );
        await jobSeeker.save();

        res.status(200).json({ message: "Job unsaved successfully." });
    } catch (error) {
        console.error("Error in unsaveJob:", error);
        res.status(500).json({ message: "Server error." });
    }
}