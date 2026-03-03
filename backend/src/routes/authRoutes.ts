import express from "express";
import { protectRoute } from "../middleware/auth";
import { authCallback, getMe } from "../controllers/authController";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/callback", authCallback);

export default router;
