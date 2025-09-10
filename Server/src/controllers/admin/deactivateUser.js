import User from "../../models/user.js";

export const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params; // /admin/users/:userId/deactivate
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // For now we just soft-delete by removing refreshToken or adding a flag
    user.refreshToken = null;
    await user.save();

    res.status(200).json({ message: "User deactivated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
