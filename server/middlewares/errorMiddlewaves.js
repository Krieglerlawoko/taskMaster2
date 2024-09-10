// Middleware for handling non-existent routes
const routeNotFound = (req, res, next) => {
    const error = new Error(`The requested route ${req.originalUrl} does not exist`);
    res.status(404);
    next(error);
  };
  
  // General error handling middleware
  const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode !== 200 ? res.statusCode : 500; // Default to 500 for server errors
    let errorMessage = err.message;
  
    // Handle specific error for invalid ObjectId
    if (err.name === "CastError" && err.kind === "ObjectId") {
      statusCode = 404;
      errorMessage = "Requested resource not found";
    }
  
    // Send error response with status code, message, and optional stack trace
    res.status(statusCode).json({
      message: errorMessage,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  export { routeNotFound, errorHandler };  