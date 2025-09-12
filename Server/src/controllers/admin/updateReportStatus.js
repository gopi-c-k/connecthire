import Report from "../../models/report.js";

export const updateReportStatus = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { status } = req.body;
        if (!reportId) return res.status(404).json({ message: "Report not found" });
        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        report.status = status || report.status;
        await report.save();
        res.status(200).json({ message: "Report status updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};