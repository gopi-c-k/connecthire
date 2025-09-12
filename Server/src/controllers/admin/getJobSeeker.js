import JobSeeker from "../../models/jobSeeker.js";

export const getJobSeeker = async (req, res) => {
  try {
    const { id } = req.params;
    const jobSeeker = await JobSeeker.findById(id);
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker not found" });
    }

    res.status(200).json({ message: "JobSeeker fetched successfully", data: jobSeeker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
