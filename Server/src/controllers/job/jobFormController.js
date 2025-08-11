import Job from "../../models/job.js";

export const createJob = async (req, res) => {
    try {
        const {
            title,
            jobId,
            description,
            location,
            duration,
            salaryRange = {},
            experienceLevel,
            skills,
            jobType,
            requirements,
            responsibilities,
            qualifications,
            openings,
            applicationDeadline,
            industry,
            additionalTags,
        } = req.body;
        const companyId = req.companyId || req.company?._id;

        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }

        const updateData = {
            company: companyId 
        };

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (location !== undefined) updateData.location = location;
        if (duration !== undefined) updateData.duration = duration;
        if (experienceLevel !== undefined) updateData.experienceLevel = experienceLevel;
        if (skills !== undefined) updateData.skills = skills;
        if (jobType !== undefined) updateData.jobType = jobType;
        if (requirements !== undefined) updateData.requirements = requirements;
        if (responsibilities !== undefined) updateData.responsibilities = responsibilities;
        if (qualifications !== undefined) updateData.qualifications = qualifications;
        if (openings !== undefined) updateData.openings = openings;
        if (applicationDeadline !== undefined) updateData.applicationDeadline = applicationDeadline;
        if (industry !== undefined) updateData.industry = industry;
        if (additionalTags !== undefined) updateData.additionalTags = additionalTags;

        if (Object.keys(salaryRange).length > 0) {
            updateData.salaryRange = {
                ...salaryRange
            };
        }

        let job;

        if (jobId) {
            job = await Job.findById(jobId);
            if (job) {
                console.log("Job found, updating existing job with ID:", jobId);
                if(req.companyId && job.company.toString() !== req.companyId.toString()) {
                    return res.status(403).json({ message: "You do not have permission to update this job." });
                }
                job = await Job.findByIdAndUpdate(jobId, { $set: updateData }, { new: true });
            } else {
                job = await Job.create(updateData);
            }
        } else {
            job = await Job.create(updateData);
        }

        res.status(200).json({ message: "Job successfully created or updated", job });

    } catch (error) {
        console.error("Error in createJob:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
