import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = await User.findById(decoded.id).select("-password"); // Attach user info to request

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
