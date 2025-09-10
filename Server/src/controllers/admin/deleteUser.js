import User from "../../models/user.js";

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params; // /admin/users/:userId
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
