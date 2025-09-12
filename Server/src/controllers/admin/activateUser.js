import User from "../../models/user.js";
import JobSeeker from "../../models/jobSeeker.js";
import Company from "../../models/company.js";

export const activateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(404).json({ message: "User not found" });

    const user = await User.findByIdAndUpdate(
      userId,
      { active: true },
      { new: true }
    );;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === 'jobseeker') {
      await JobSeeker.findOneAndUpdate(
        { user: userId },
        { active: true },
        { new: true }
      );
    } else if (user.role === 'company') {
      await Company.findOneAndUpdate(
        { user: userId },
        { active: true },
        { new: true }
      );
    }
    res.status(200).json({ message: "User deactivated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
