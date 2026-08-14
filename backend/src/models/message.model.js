import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,  // this is the type of the field, which is an ObjectId. This is a special type in MongoDB that is used to store the unique identifier for a document in a collection. In this case, it will store the unique identifier for the user who sent the message.
        ref: 'User',
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId, // storing the receiver's id as reference to the User model. This allows us to easily populate the receiver's information when we query for messages.
        ref: 'User',
        required: true
    },
    text:{
        type: String,
        required: true  
    },
    image:{
        type: String,
        required: true  
    },
    video:{
        type: String,
        required: true  
    }
},{timestamps: true});

const Message = mongoose.model("Message", messageSchema); 
export default Message;