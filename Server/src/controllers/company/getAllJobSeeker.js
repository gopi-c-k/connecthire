import JobSeeker from "../../models/jobSeeker.js";
import Company from "../../models/company.js";

export const getAllJobSeekers = async (req, res) => {
    try {
        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company profile not found" });
        }

        const jobSeekers = await JobSeeker.find({})
            .select('bio skills fullName profilePicture messageAllowed jobsApplied profileVisibility user')
            .populate('user', 'name email');

        let jobSeekerList = [];

        for (let js of jobSeekers) {
            if (js.profileVisibility === 'public' || js.messageAllowed === 'anyone') {
                jobSeekerList.push(js);
            } else if (js.profileVisibility === 'recruiters' && js.messageAllowed === 'recruiters') {
                jobSeekerList.push(js);
            } else {
                const hasApplied = js.jobsApplied.some(
                    (app) => app.company && app.company.toString() === company._id.toString()
                );
                if (hasApplied) {
                    jobSeekerList.push(js);
                }
            }
        }

        res.status(200).json({ jobSeekers });
    } catch (error) {
        console.error("Error fetching job seekers:", error);
        res.status(500).json({ message: "Server error" });
    }
};