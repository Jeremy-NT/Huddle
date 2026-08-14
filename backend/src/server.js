import express from 'express';
import connectDB from '../lib/db.js';
import 'dotenv/config.js'; // Load environment variables from .env file
import User from '../models/user.model.js';
import {clerkMiddleware} from '@clerk/express';
import cors from 'cors';
import fs from fs; // Import the file system module to handle file operations
import path from 'path'; // Import the path module to handle file and directory paths

const PORT = process.env.PORT || 3000; // Use the PORT from environment variables or default to 3000
const app = express(); // Create an instance of the Express application
const FRONTEND_URL = process.env.FRONTEND_URL
const publicDir = path.join(process.cwd(), 'public'); // Define the path to the public directory for serving static files

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors({origin:FRONTEND_URL, credentials: true})); // Use CORS middleware to handle cross-origin resource sharing
app.use(clerkMiddleware()); // Use Clerk middleware to handle authentication and user management

app.get('/health', (req, res) => {
  res.status(200).send('Server is running!');
}); // Define a health check endpoint to verify that the server is running

if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir)); // Serve static files from the public directory if it exists

  app.get("/{any*}", (req, res, next) => {
  res.sendFile(path.join(publicDir, 'index.html'), (err) => next (err))
 })/// Serve the index.html file for any unmatched routes
}
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
}); // Start the server and connect to the database, logging a message to indicate that the server is running