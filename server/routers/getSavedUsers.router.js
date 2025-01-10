import express from "express";
import User from "../db/user.schema.js";
import { verifyToken } from "../utilities/autorization.js";

const router = express.Router();
console.log("hit")
router.get("/", verifyToken, async (req, res) => {
  
  const loggedUserId = req.user.userId._id;
  try {
    const savedUserData = await User.find({ _id: { $ne: loggedUserId } });
    res.json(savedUserData);
  } catch (error) {
    res.json(error.message);
  }
});
export default router;
