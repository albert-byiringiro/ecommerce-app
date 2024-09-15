import dotenv from "dotenv"
import express from "express"
import cors from "cors"

import { connectToDatabase } from './src/config/database.js'
import errorHandler from "./src/middleware/errorHandler.js"
import itemRoutes from './src/routes/itemRoutes.js'

dotenv.config();

const app = express();

// Middlewares
app.use(cors())
app.use(express.json())

app.use('/items', itemRoutes)

// middleware to handle errors
app.use(errorHandler)

const PORT = process.env.PORT || 3000;

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    })