import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
let onlineUsers = {};

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

function getRecieverId(recieverId) {
  if (recieverId in onlineUsers) {
    return onlineUsers[recieverId];
  }
}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  onlineUsers[userId] = socket.id;

  console.log(onlineUsers);
  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete onlineUsers[userId];
    console.log(onlineUsers);
    io.emit("onlineUsers", onlineUsers);
  });
  // socket.on("chat message", (msg) => {
  //     console.log("message: " + msg);
  //     io.emit("chat message", msg);
  // });
});

export { app, server, io, getRecieverId };
