import Report from "../../models/report.js";

export const getAllReport = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporter")
      .populate("reportedUser");

    res.status(200).json({ message: "Reports fetched successfully", data: reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
