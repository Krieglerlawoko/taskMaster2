import express from "express";
import { checkAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  userLogin,
  userLogout,
  modifyUserProfile,
  changeUserPassword,
  removeUserAccount,
  fetchUserNotifications,
  fetchTeamMembers,
  updateNotificationStatus,
  activateUserAccount,
} from "../controllers/userController.js";

const userRouter = express.Router();

// User Authentication Routes
userRouter.post("/signup", registerUser);
userRouter.post("/signin", userLogin);
userRouter.post("/signout", userLogout);

// User Profile and Notifications
userRouter.get("/team", authenticateUser, checkAdmin, fetchTeamMembers);
userRouter.get("/notifications", authenticateUser, fetchUserNotifications);

userRouter.put("/profile", authenticateUser, modifyUserProfile);
userRouter.put("/notifications/status", authenticateUser, updateNotificationStatus);
userRouter.put("/password", authenticateUser, changeUserPassword);

// Admin Routes for User Management
userRouter
  .route("/user/:id")
  .put(authenticateUser, checkAdmin, activateUserAccount)
  .delete(authenticateUser, checkAdmin, removeUserAccount);

export default userRouter;