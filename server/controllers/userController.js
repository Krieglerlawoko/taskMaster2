import { response } from "express";
import User from "../models/user.js";
import { createJWT } from "../utils/index.js";
import Notice from "../models/notification.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      isAdmin,
      role,
      title,
    });

    if (newUser) {
      if (isAdmin) createJWT(res, newUser._id);
      
      newUser.password = undefined;

      res.status(201).json(newUser);
    } else {
      return res.status(400).json({ status: false, message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Log in a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid email or password." });
    }

    if (!user?.isActive) {
      return res.status(401).json({
        status: false,
        message: "User account has been deactivated, please contact the administrator",
      });
    }

    const isPasswordMatch = await user.matchPassword(password);

    if (user && isPasswordMatch) {
      createJWT(res, user._id);

      user.password = undefined;

      res.status(200).json(user);
    } else {
      return res.status(401).json({ status: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Log out the user
export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Retrieve list of team members
export const getTeamList = async (req, res) => {
  try {
    const team = await User.find().select("name title role email isActive");

    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Fetch notifications
export const getNotificationsList = async (req, res) => {
  try {
    const { userId } = req.user;

    const notifications = await Notice.find({
      team: userId,
      isRead: { $nin: [userId] },
    }).populate("task", "title");

    res.status(201).json(notifications);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id } = req.body;

    const targetUserId = isAdmin && userId !== _id ? _id : userId;

    const user = await User.findById(targetUserId);

    if (user) {
      user.name = req.body.name || user.name;
      user.title = req.body.title || user.title;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();

      user.password = undefined;

      res.status(201).json({
        status: true,
        message: "Profile updated successfully.",
        user: updatedUser,
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Mark notifications as read
export const markNotificationRead = async (req, res) => {
  try {
    const { userId } = req.user;
    const { isReadType, id } = req.query;

    if (isReadType === "all") {
      await Notice.updateMany(
        { team: userId, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } }
      );
    } else {
      await Notice.findOneAndUpdate(
        { _id: id, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } }
      );
    }

    res.status(201).json({ status: true, message: "Marked as read" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Change user password
export const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (user) {
      user.password = req.body.password;

      await user.save();

      user.password = undefined;

      res.status(201).json({
        status: true,
        message: "Password changed successfully.",
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Activate or deactivate user profile
export const activateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (user) {
      user.isActive = req.body.isActive;

      await user.save();

      res.status(201).json({
        status: true,
        message: `User account has been ${user.isActive ? "activated" : "disabled"}`,
      });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

// Delete a user profile
export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};