import express from "express";
import Register from "../controllers/register.controller.js";
import Login from "../controllers/login.controller.js";
import Logout from "../controllers/logout.controller.js";
import { verifyToken } from "../utilities/autorization.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/main", verifyToken, (req, res) => {
  res.json({ content: "this is a main content" });
});

export default router;
