import JobSeeker from '../../models/jobSeeker.js';

export const getAllJobSeeker = async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.find().populate("user");
    res.status(200).json({ message: "Companies fetched successfully", data: jobSeeker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
