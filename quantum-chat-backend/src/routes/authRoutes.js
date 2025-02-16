import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { check } from "express-validator";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Registration Route
router.post(
  "/register",
  [
    check("username", "Username is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  registerUser
);

// Login Route with Rate Limiter
router.post(
  "/login",
  loginLimiter,
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  loginUser
);

export default router;
