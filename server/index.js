import express from "express";
import userEntry from "./routers/userEntry.router.js";
import getSavedUsers from ".//routers/getSavedUsers.router.js";
import handleChat from "./routers/handleChats.router.js";
import connectDb from "./db/connectDb.js";
import getUserChat from "./routers/getUserChat.router.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server, io } from "./web-sockets/web-socket.js";

dotenv.config();


const port = 3000;
connectDb();

app.use(cors({
  origin: "http://localhost:5173", // Ensure this matches your frontend's URL
  credentials: true,              // Allow sending cookies
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/user", userEntry);
app.use("/saved/users", getSavedUsers);
app.use("/user/chat", handleChat);
app.use("/get/user/chat",getUserChat)

server.listen(port, () => {
  
  console.log(`listening on port ${port}`);
});
//https://avatar.iran.liara.run/public/boy?username=mohamedyasar
//jg3lmPR1WD06w3bn
