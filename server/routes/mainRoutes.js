import express from 'express';
import userRoutes from './userRoutes.js'; // Adjust the path if necessary
import taskRoutes from './taskRoutes.js'; // Adjust the path if necessary

const router = express.Router();

// Use the user routes
router.use('/user', userRoutes);

// Use the task routes
router.use('/task', taskRoutes);

export default router;