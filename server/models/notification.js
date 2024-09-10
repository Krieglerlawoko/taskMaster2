import mongoose, { Schema } from "mongoose";

// Define the schema for notifications
const notificationSchema = new Schema(
  {
    team: [{ type: Schema.Types.ObjectId, ref: "User" }], // Team members associated with the notice
    message: { type: String }, // Notification text
    task: { type: Schema.Types.ObjectId, ref: "Task" }, // Related task reference
    notificationType: { type: String, default: "alert", enum: ["alert", "message"] }, // Notification category
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // Users who have read the notice
  },
  { timestamps: true } // Add createdAt and updatedAt timestamps automatically
);

// Create the model based on the schema
const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;