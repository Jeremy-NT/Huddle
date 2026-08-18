import express from "express";
import { checkAuth } from "../controllers/auth.controllers.js";

const router = express.Router();

//so here basicaly when user sends a req to /api/auth/check we are gonna call this endpoint:
router.get("/check", protectRoute, checkAuth)

export default router;