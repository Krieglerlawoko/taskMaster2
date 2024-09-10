import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

// Define the schema for users
const employeeSchema = new Schema(
  {
    fullName: { type: String, required: true }, // User's full name
    position: { type: String, required: true }, // User's title or position
    userRole: { type: String, required: true }, // User's role in the system
    emailAddress: { type: String, required: true, unique: true }, // Unique email
    hashedPassword: { type: String, required: true }, // User's hashed password
    isAdmin: { type: Boolean, default: false, required: true }, // Admin status
    assignedTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }], // Tasks assigned to user
    isActive: { type: Boolean, default: true, required: true }, // Active status
  },
  { timestamps: true } // Auto add createdAt and updatedAt
);

// Pre-save middleware to hash the password before saving
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("hashedPassword")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
});

// Method to compare entered password with the stored hashed password
employeeSchema.methods.verifyPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.hashedPassword);
};

// Create the User model
const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;