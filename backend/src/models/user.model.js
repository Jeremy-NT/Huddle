import mongoose from 'mongoose';

// Define the schema for the user model
const userSchema = new mongoose.Schema({
    // mongoose will automatically create an _id field for each document
    //but since we are using clerk for authentication, we will use the clerk user id as the _id field
    clerkId:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    fullName:{
        type: String,
        required: true,
    },
    profileImage:{
        type: String,
        default: ""
    },
},{timestamps: true}); 


// above is the schema for the user model, which defines the structure of the user documents in the database

// Create a model from the schema
const User = mongoose.model('User', userSchema);// The first argument is the name of the model, and the second argument is the schema to use for that model. we are also passing the schema to the model so that we can use it to create and manipulate user documents in the database.

export default User; // Export the model so that it can be used in other parts of the application.