import Job from "../../models/job.js";

export const getAllJob = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company");
    res.status(200).json({ message: "Jobs fetched successfully", data: jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
