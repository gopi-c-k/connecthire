import Company from "../../models/company.js";
import JobProposal from "../../models/jobProposal.js";

export const getJobProposalsForCompany = async (req, res) => {
  try {
    const companyId = req.companyId || req.company?._id;
    if (!companyId) {
      return res.status(400).json({ message: "Company information is missing." });
    }
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const proposals = await JobProposal.find({ company })
      .populate('job','_id title description')
      .populate('jobSeeker', 'fullName profilePicture email resume viewResume messageAllowed');

    res.status(200).json({ proposals });
  } catch (error) {
    console.error("Error fetching job proposals for company:", error);
    res.status(500).json({ message: "Server error" });
  }
};