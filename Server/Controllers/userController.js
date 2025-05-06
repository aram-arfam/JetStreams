import user from "../Models/userModel.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is missing" });
    }
    const foundUser = await user.findById(userId).select("-password");

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      userData: {
        name: foundUser.name,
        email: foundUser.email,
        bio: foundUser.bio,
        phone: foundUser.phone,
        avatar: foundUser.avatar,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const setProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, bio, phone } = req.body;

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { name, email, bio, phone },
      { new: true }
    );

    return res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userList = async (req, res) => {
  try {
    const users = await user.find({}, "name email phone "); // Fetch selected fields
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
