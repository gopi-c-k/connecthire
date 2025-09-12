import Company from "../../models/company.js";

export const getCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id).populate("jobsPosted","title status postedAt");
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ message: "Company fetched successfully", data: company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
