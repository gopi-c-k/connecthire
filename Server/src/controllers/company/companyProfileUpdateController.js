import Company from "../../models/company.js";

export const updateCompanyProfile = async (req, res) => {
    try {
        const { companyName, website, description, companyLogo } = req.body;
        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }
        const updateData = {
            companyName,
            website,
            description,
            companyLogo
        };
        const updatedCompany = await Company.findByIdAndUpdate(
            companyId,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedCompany) {
            return res.status(404).json({ message: "Company not found." });
        }
        res.status(200).json({
            message: "Company profile updated successfully.",
            company: updatedCompany
        });
    } catch (error) {
        console.error("Error updating company profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}