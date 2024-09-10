import mongoose, { Schema } from "mongoose";

// Define the schema for tasks
const projectTaskSchema = new Schema(
  {
    title: { type: String, required: true }, // Task title
    createdDate: { type: Date, default: new Date() }, // Date when the task is created
    priorityLevel: {
      type: String,
      default: "normal", // Default priority
      enum: ["high", "medium", "normal", "low"], // Priority levels
    },
    taskStage: {
      type: String,
      default: "todo", // Initial stage
      enum: ["todo", "in progress", "completed"], // Task stages
    },
    activityLogs: [
      {
        eventType: {
          type: String,
          default: "assigned", // Default activity type
          enum: [
            "assigned",
            "started",
            "in progress",
            "bug",
            "completed",
            "commented",
          ], // Activity types
        },
        description: String, // Activity details
        eventDate: { type: Date, default: new Date() }, // Date of activity
        user: { type: Schema.Types.ObjectId, ref: "User" }, // User performing the activity
      },
    ],

    subTasksList: [
      {
        taskTitle: String, // Sub-task title
        deadline: Date, // Sub-task deadline
        label: String, // Tag or label for the sub-task
      },
    ],
    attachedFiles: [String], // List of asset file paths or URLs
    assignedTeam: [{ type: Schema.Types.ObjectId, ref: "User" }], // Users assigned to the task
    deleted: { type: Boolean, default: false }, // If the task is in the trash
  },
  { timestamps: true } // Automatic timestamps
);

// Create the model for tasks
const ProjectTask = mongoose.model("ProjectTask", projectTaskSchema);

export default ProjectTask;