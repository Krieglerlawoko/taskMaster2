import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies?.token;

    if (token) {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user details based on decoded token
      const user = await User.findById(decoded.userId).select("isAdmin email");

      // Attach user information to request object
      req.user = {
        email: user.email,
        isAdmin: user.isAdmin,
        userId: decoded.userId,
      };

      // Proceed to next middleware or route
      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized access. Please log in." });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(401)
      .json({ status: false, message: "Authorization failed. Try logging in again." });
  }
};

// Middleware to restrict access to admin users
const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // If user is an admin, proceed to the next step
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Access denied. Admin privileges required.",
    });
  }
};

export { protectRoute, isAdminRoute };