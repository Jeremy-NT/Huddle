import express from 'express';
import connectDB from '../lib/db.js';
import dotenv from 'dotenv';


const app = express();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});