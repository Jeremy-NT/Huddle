 import express from 'express';
 import User from '../models/user.js';
 import { verifyWebhook} from '@clerk/backend/webhooks';// this is the Clerk webhook verification middleware
import { profile } from 'console';

const router = express.Router(); // Create a new user when a Clerk user is created
router.post('/', verifyWebhook, async (req, res) => {
   try{
    const signingSecret = process.env.CLERK_SIGNING_SECRET;
   if (!signingSecret) {
    res.status(500).json({error: 'Webhook signing secret is not defined in the env.'}); // Exit if signing secret is not defined
   }

    const payload = Buffer.from(req.body) ? req.body.toString('utf-8'): String(req.body); // Convert the request body to a string
    const request = new Request ("http://internal/webhooks/clerk",{
        method: "POST",
        headers: new Headers(req.headers),
        body: payload
    });

    const evt = await verifyWebhook(request, {signingSecret});
    if(evt.type==="User.created" || evt.type === "user.updated"){
        const u = evt.data; //we are listening for this events and below we are handling them successfuly
        
        const email =
        u.email_addresses?.find((e)=> e.id === u.primary_email_address_id)?.email_address ??
        u.email_addresses?.[0]?.email_address; // finding the user's email

        const fullName =
        [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || email?.split("@")
        [0];

        await User.findOneAndUpdate(
            {clerkId: u.id},
            {clerkId: u.id, email, fullName, profileImage: u.image_url },
            {new: true, upsert: true, setDfaultsOnIsert: true}
        );
    }
    if (evt.type === "user.deleted"){
        if(evt.data.id) await User.findOneAndDelete({clerkId: evt.data.id})
    }

    res.status(200).json({recived: true});
   } catch(error){
    console.error("Error in clerk webhook:", error);
   }
        
}); 
 export default router;