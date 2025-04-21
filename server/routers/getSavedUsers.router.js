import express from "express";
import User from "../db/user.schema.js";
import { verifyToken } from "../utilities/autorization.js";

const router = express.Router();


router.get("/",verifyToken,  async (req, res) => {
  
  const loggedUserId = req.user.userId._id;
  
  try {
    const savedUserData = await User.find({ _id: { $ne: loggedUserId } });
    //console.log(savedUserData);
    
    res.json(savedUserData);
  } catch (error) {
    res.json(error.message);
  }
});
export default router;
