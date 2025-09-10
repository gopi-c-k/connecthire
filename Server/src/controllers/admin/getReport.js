import Report from "../../models/report.js";

export const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id)
      .populate("reporter")
      .populate("reportedUser");

    if (!report) return res.status(404).json({ message: "Report not found" });

    res.status(200).json({ message: "Report fetched successfully", data: report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
