import JobSeeker from "../../models/jobSeeker.js";
import Job from "../../models/job.js";

export const getJobsForJobSeeker = async (req, res) => {
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

        // pagination params from query
        const page = parseInt(req.query.page) || 1; // default page = 1
        const limit = parseInt(req.query.limit) || 10; // default limit = 10
        const skip = (page - 1) * limit;

        // recommended jobs query
        const skills = jobSeeker.skills || [];

        // total jobs count (for frontend pagination UI)
        const totalJobs = await Job.countDocuments({
            skills: { $in: skills },
            status: "open",
        });

        const recommendedJobs = await Job.find({
            skills: { $in: skills },
            status: "open",
        })
            .select("title duration location skills status postedAt") // fields from Job
            .populate("company", "companyName companyLogo") // fields from Company
            .sort({ postedAt: -1 }) // newest first
            .skip(skip) // pagination skip
            .limit(limit); // pagination limit

        // send response
        res.status(200).json({
            recommendedJobs,
            pagination: {
                totalJobs,
                page,
                limit,
                totalPages: Math.ceil(totalJobs / limit),
            },
        });
    } catch (error) {
        console.error("Error in getJobsForJobSeeker:", error);
        res.status(500).json({ message: "Server error." });
    }
};
