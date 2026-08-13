import express from 'express';
import connectDB from '../lib/db.js';
import 'dotenv/config.js'; // Load environment variables from .env file
import User from '../models/user.model.js';
import {clerkMiddleware} from '@clerk/express';
import cors from 'cors';


const app = express(); // Create an instance of the Express application

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Use CORS middleware to handle cross-origin resource sharing
app.use(clerkMiddleware()); // Use Clerk middleware to handle authentication and user management

app.get('/health', (req, res) => {
  res.status(200).send('Server is running!');
}); // Define a health check endpoint to verify that the server is running

const PORT = process.env.PORT || 3000; // Use the PORT from environment variables or default to 3000
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
}); // Start the server and connect to the database, logging a message to indicate that the server is running