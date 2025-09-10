import Company from "../../models/company.js";
import User from "../../models/user.js";

export const deactivateAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    const user = await User.findByIdAndUpdate(
      userId,
      { active: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Company.findOneAndUpdate(
      { user: userId },
      { active: false },
      { new: true }
    );

    res.status(200).json({ message: "Account deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating account:", error);
    res.status(500).json({ message: "Server error" });
  }
};
