// utils/index.js
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Establishes a connection to the MongoDB database
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error: " + error);
  }
};

// Generates a JWT token and sets it in an HTTP-only cookie
export const createJWT = (response, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  // Adjust sameSite attribute for cookies based on your environment
  response.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", // Mitigates CSRF attacks
    maxAge: 24 * 60 * 60 * 1000, // Token expiry: 1 day
  });
};