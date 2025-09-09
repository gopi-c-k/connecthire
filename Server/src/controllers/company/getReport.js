import Report from "../../models/report.js";
import Company from "../../models/company.js";

export const getReports = async (req, res) => {
    try {
        const companyId = req.companyId || req.company?._id;
        if (!companyId) {
            return res.status(400).json({ message: "Company information is missing." });
        }
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }
        const reports = await Report.find({ reporter: company._id })
            .populate("reportedUser", 'fullName')
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: reports });
    } catch (error) {
        console.error("Error fetching reports:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Could not fetch reports.",
        });
    }
};
