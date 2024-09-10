import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { handleErrors, handleNotFound } from "./middlewares/errorHandlers.js";
import apiRoutes from "./routes/mainRoutes.js";
import { connectDatabase } from "./utils/helpers.js";

dotenv.config();

// Establish a connection to the database
connectDatabase();

const SERVER_PORT = process.env.PORT || 5000;

const app = express();

// Configure CORS to allow requests from specific origins
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Logger middleware for development
app.use(morgan("dev"));

// Register API routes
app.use("/api", apiRoutes);

// Middleware for handling 404 errors
app.use(handleNotFound);

// Middleware for handling all other errors
app.use(handleErrors);

// Start the server and listen on the specified port
app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));