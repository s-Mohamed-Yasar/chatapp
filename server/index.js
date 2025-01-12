import express from "express";
import userEntry from "./routers/userEntry.router.js";
import getSavedUsers from ".//routers/getSavedUsers.router.js";
import handleChat from "./routers/handleChats.router.js";
import connectDb from "./db/connectDb.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;
connectDb();

app.use(cors());
app.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials',true)
})
app.use(express.json());
app.use(cookieParser());

app.use("/user", userEntry);
app.use("/saved/users", getSavedUsers);
app.use("/user/chat", handleChat);

app.listen(port, () => {
  console.log("hitted");
  
  console.log(`listening ${port}`);
});
//https://avatar.iran.liara.run/public/boy?username=mohamedyasar
//jg3lmPR1WD06w3bn
