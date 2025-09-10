import Company from "../../models/company.js";

export const getAllCompany = async (req, res) => {
  try {
    const companies = await Company.find().populate("user");
    res.status(200).json({ message: "Companies fetched successfully", data: companies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
