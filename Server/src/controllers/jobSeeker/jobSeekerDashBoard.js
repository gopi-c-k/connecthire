import JobSeeker from "../../models/jobSeeker.js";
import JobProposal from "../../models/jobProposal.js";
import Job from "../../models/job.js";

export const getJobSeekerDashboard = async (req, res) => {
    try {
        const jobSeekerId = req.jobSeeker?._id || req.jobSeeker; // safer optional chaining
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

        // counts
        const jobsApplied = jobSeeker.jobsApplied?.length || 0;
        const jobsSaved = jobSeeker.jobsSaved?.length || 0;

        // placeholder
        const totalMessage = 0;
        // // recent jobs applied
        const jobIds = await JobProposal.find({
            jobSeeker: jobSeekerId,
        }).select("job");
        const jobIdList = jobIds.map((job) => job.job);
        const recentJobsApplied = await JobProposal.find({
            job: { $in: jobIdList },
            jobSeeker: jobSeekerId,
        })
            .populate("job", "_id title")
            .populate("company", "companyName companyLogo")
            .sort({ recentUpdate: -1 })
            .limit(3);

        // interviewed count
        const interviewedStatusCount = await JobProposal.countDocuments({
            jobSeeker: jobSeekerId,
            status: "interviewed",
        });

        // recommended jobs
        const skills = jobSeeker.skills || [];
        const recommendedJobs = await Job.find(
            {
                skills: { $in: skills },
                status: "open",
            }
        )
            .select("title duration location skills status") // fields from Job
            .populate("company", "companyName companyLogo")  // fields from Company
            .sort({ postedAt: -1 })
            .limit(3);


        // send response
        res.status(200).json({
            jobsApplied,
            jobsSaved,
            totalMessage,
            recentJobsApplied,
            interviewedStatusCount,
            recommendedJobs,
        });
    } catch (error) {
        console.error("Error fetching job seeker dashboard:", error);
        res.status(500).json({ message: "Server error" });
    }
};
