import express from "express";
import {
  addSubTask,
  createNewTask,
  getDashboardStats,
  manageTaskDeletion,
  duplicate,
  fetchTaskDetails,
  getTask,
  recordTaskActivity,
  markTaskAsTrashed,
  modifyTask,
} from "../controllers/taskController.js";
import { checkAdmin, authenticateUser } from "../middlewares/authMiddleware.js";

const taskRouter = express.Router();

// Endpoint to create a new task
taskRouter.post("/new", authenticateUser, checkAdmin, createNewTask);

// Endpoint to duplicate an existing task
taskRouter.post("/clone/:id", authenticateUser, checkAdmin, duplicate);

// Endpoint to post activity for a task
taskRouter.post("/activity/:id", authenticateUser, recordTaskActivity);

// Endpoint to get dashboard statistics
taskRouter.get("/stats", authenticateUser, getDashboardStats);

// Endpoint to get a list of tasks
taskRouter.get("/", authenticateUser, getTask);

// Endpoint to get details of a specific task
taskRouter.get("/:id", authenticateUser, fetchTaskDetails);

// Endpoint to add a subtask to an existing task
taskRouter.put("/subtask/:id", authenticateUser, checkAdmin, addSubTask);

// Endpoint to update an existing task
taskRouter.put("/edit/:id", authenticateUser, checkAdmin, modifyTask);

// Endpoint to mark a task as trashed
taskRouter.put("/trash/:id", authenticateUser, checkAdmin, markTaskAsTrashed);

// Endpoint to delete or restore tasks
taskRouter.delete("/manage/:id?", authenticateUser, checkAdmin, manageTaskDeletion);

export default taskRouter;