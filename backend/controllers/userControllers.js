import User from "../models/userModel.js";

// Admin: get all users
const getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(search)
      .select("_id name email role isVerified isActive")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCount = await User.countDocuments(search);

    res.status(200).json({
      users,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};
// @desc    Update user role (Admin only)
// @route   PUT /api/users/:id/role
// @access  Admin
const updateUserRole = async (req, res) => {
  const allowedRoles = ["admin", "user", "sales", "inventory", "purchase"];

if (!allowedRoles.includes(req.body.role)) {
  return res.status(400).json({
    message: `Invalid role. Allowed roles are: ${allowedRoles.join(", ")}`
  });
}
// Prevent admin from changing own role
if (req.user._id.toString() === req.params.id) {
  return res.status(403).json({
    message: "Admin cannot change their own role"
  });
}

  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "User role updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user._id.toString() === userId) {
      return res.status(403).json({
        message: "Admin cannot delete their own account",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        message: "Cannot delete another admin",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while deleting user",
    });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;

    // 1️⃣ Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 2️⃣ Toggle isActive
    user.isActive = !user.isActive;

    // 3️⃣ Save changes
    await user.save();

    res.status(200).json({
      message: `User ${
        user.isActive ? "activated" : "deactivated"
      } successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while updating user status",
    });
  }
};



export { getAllUsers, updateUserRole, deleteUserById, toggleUserStatus, };