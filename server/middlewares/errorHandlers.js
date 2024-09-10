// middlewares/errorHandlers.js

// Middleware to handle routes that are not found
export const routeNotFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  // Middleware to handle errors
  export const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
  
    // Handling specific errors
    if (err.name === "CastError" && err.kind === "ObjectId") {
      statusCode = 404;
      message = "Resource not found";
    }
  
    res.status(statusCode).json({
      message: message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };  