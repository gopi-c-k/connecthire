import JobProposal from "../../models/jobProposal.js";

export const getAllJobProposal = async (req, res) => {
  try {
    const proposals = await JobProposal.find()
      .populate("job")
      .populate("jobSeeker")
      .populate("company");

    res.status(200).json({ message: "Job proposals fetched successfully", data: proposals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
