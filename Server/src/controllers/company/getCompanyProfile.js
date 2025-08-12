import Company from "../../models/company.js";

export const getCompanyProfile = async (req, res) => {
    try {
        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }
        const company = await Company.findById(companyId)
            .populate('user', 'name email') // Populate user details
            .populate('jobsPosted'); // Populate jobs posted by the company
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }
        res.status(200).json({
            message: "Company profile retrieved successfully.",
            company
        });
    }
    catch (error) {
        console.error("Error retrieving company profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}