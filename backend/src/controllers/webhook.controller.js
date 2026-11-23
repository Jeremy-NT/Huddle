// controllers/webhook.controller.js
import { verifyWebhook } from "@clerk/express/webhooks";
import User from "../models/user.model.js";

export async function clerkWebhook(req, res) {
    try {
        const evt = await verifyWebhook(req); // verifies signature using CLERK_WEBHOOK_SECRET automatically

        const { id, email_addresses, first_name, last_name, image_url } = evt.data;
        const eventType = evt.type;

        if (eventType === "user.created") {
            await User.create({
                clerkId: id,
                email: email_addresses?.[0]?.email_address,
                firstName: first_name,
                lastName: last_name,
                profilePic: image_url,
            });
        }

        if (eventType === "user.updated") {
            await User.findOneAndUpdate(
                { clerkId: id },
                {
                    email: email_addresses?.[0]?.email_address,
                    firstName: first_name,
                    lastName: last_name,
                    profilePic: image_url,
                }
            );
        }

        if (eventType === "user.deleted") {
            await User.findOneAndDelete({ clerkId: id });
        }

        res.status(200).json({ message: "webhook processed" });
    } catch (error) {
        console.error("error verifying webhook:", error.message);
        return res.status(400).json({ message: "webhook verification failed" });
    }
}