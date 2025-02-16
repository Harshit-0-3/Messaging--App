import express from "express";
import { sendMessage, getMessages } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/send",
  protect,
  [
    check("sender", "Sender ID is required").isMongoId(),
    check("receiver", "Receiver ID is required").isMongoId(),
    check("message", "Message cannot be empty").notEmpty().trim().escape(),
  ],
  sendMessage
);

router.get("/messages", protect, getMessages);

export default router;
