//connecting to the database using mongoose
import mongoose from "mongoose";


import dotenv from "dotenv";
dotenv.config(); // load environment variables from a .env file into process.env 


// function to connect to the database and handle any errors that may occur during the connection process
async function connectDB(){
    try{
        const mongoUri = process.env.MONGODB_URI; // retrieve the MongoDB connection URI from the environment variables

        if(!mongoUri){
            throw new Error("MONGODB_URI is required in the .env") // check if the MONGODB_URI environment variable is defined. If not, throw an error.
        }

        await mongoose.connect(mongoUri); 
        console.log("MongoDB connected successfully"); // if the connection is successful, log a message to the console indicating that the connection was successful.
    } catch (error) {
        console.error("Error connecting to MongoDB:", error); // if there is an error during the connection process, log an error message to the console indicating that there was an error connecting to MongoDB.
        process.exit(1);
        // 1 means failed 0 means success
    }
}
export default connectDB; // export the connectDB function so that it can be used in other parts of the application.