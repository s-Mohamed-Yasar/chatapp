import express from "express";
import userEntry from "./routers/userEntry.router.js";
import getSavedUsers from ".//routers/getSavedUsers.router.js";
import handleChat from "./routers/handleChats.router.js";
import connectDb from "./db/connectDb.js";
import getUserChat from "./routers/getUserChat.router.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server, io } from "./web-sockets/web-socket.js";
import path from "path";
import { fileURLToPath } from "url";

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.dirname(__dirname);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

connectDb();

app.use(express.static(path.join(rootDir, "client/dist")));
app.use(
  cors({
    origin: "https://chatapp-pieu.onrender.com",
    credentials: true, // Allow sending cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/user", userEntry);
app.use("/saved/users", getSavedUsers);
app.use("/user/chat", handleChat);
app.use("/get/user/chat", getUserChat);

app.get("/debug", (req, res) => {
  res.sendFile(path.join(rootDir, "client/dist", "index.html"));
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

