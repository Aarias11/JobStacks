import User from "../models/User";

// @desc    Get current user's profile
// @route   GET /api/users/me
export const getUserProfile = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update current user's profile
// @route   PUT /api/users/me
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
        user.passwordHash = req.body.password
    }

    await user.save();

    res.status(200).json({
        message: 'User profile updated',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });

  } catch (err) {
    next(err);
  }
};



// @desc    Delete current user's account
// @route   DELETE /api/users/me
export const deleteUserAccount = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.status(200).json({ message: 'User account deleted' })
    } catch (err) {
        next(err)
    }
}
