import express from "express";
import Register from "../controllers/register.controller.js";
import Login from "../controllers/login.controller.js";
import Logout from "../controllers/logout.controller.js";
import { verifyToken } from "../utilities/autorization.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.json({ message: "user entry point" });
});
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);

//router.get("/main", verifyToken, (req, res) => {

router.get("/main", (req, res) => {
  const token = req.cookies;
  console.log(token);
  
  res.json({ content: "this is a main content" });
});

export default router;
