// Import required modules
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './src/config/database.js';
import itemRoutes from './src/routes/itemRoutes.js';
import errorHandler from './src/middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/items', itemRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 3000;

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    });