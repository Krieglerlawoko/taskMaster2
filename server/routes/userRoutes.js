import express from "express";
import { checkAdmin, ensureAuthenticated } from "../middlewares/authMiddleware.js";
import {
  createUserAccount,
  userLogin,
  userLogout,
  modifyUserProfile,
  changePassword,
  removeUserAccount,
  fetchUserNotifications,
  fetchTeamMembers,
  updateNotificationStatus,
  activateUserAccount,
} from "../controllers/userController.js";

const userRouter = express.Router();

// User Authentication Routes
userRouter.post("/signup", createUserAccount);
userRouter.post("/signin", userLogin);
userRouter.post("/signout", userLogout);

// User Profile and Notifications
userRouter.get("/team", ensureAuthenticated, checkAdmin, fetchTeamMembers);
userRouter.get("/notifications", ensureAuthenticated, fetchUserNotifications);

userRouter.put("/profile", ensureAuthenticated, modifyUserProfile);
userRouter.put("/notifications/status", ensureAuthenticated, updateNotificationStatus);
userRouter.put("/password", ensureAuthenticated, changePassword);

// Admin Routes for User Management
userRouter
  .route("/user/:id")
  .put(ensureAuthenticated, checkAdmin, activateUserAccount)
  .delete(ensureAuthenticated, checkAdmin, removeUserAccount);

export default userRouter;