import express from "express";
import { verifyToken } from "../utilities/autorization.js";
import Message from "../db/message.schema.js";
import Conversation from "../db/conversation.schema.js";
import { getRecieverId } from "../web-sockets/web-socket.js";
import { get } from "mongoose";
import { io } from "../web-sockets/web-socket.js";

const router = express.Router();

router.post("/:id", verifyToken, async (req, res) => {
  const { id: receiverId } = req.params;

  const typedMessage = req.body.message;

  const sender = req.user;

  try {
    const newMessage = await new Message({
      senderId: sender.userId._id,
      receiverId: receiverId,
      message: typedMessage,
    });
    //await message.save()
    try {
      let conversation = await Conversation.findOne({
        participants: { $all: [sender.userId._id, receiverId] },
      });
      if (!conversation) {
        conversation = await new Conversation({
          participants: [sender.userId._id, receiverId],
        });
      }
      conversation.messages.push(newMessage._id);
      await Promise.all([newMessage.save(), conversation.save()]);

      const receiverSocketId = getRecieverId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("chat message", typedMessage);
      }

      const messagesDoc = await Message.find({
        _id: { $in: conversation.messages },
      });
      //console.log(messagesDoc);

      res.json(messagesDoc).status(200);
    } catch (error) {
      res.json({
        message: "Internal server error in conversation",
        error: error.message,
      });
    }
  } catch (error) {
    res.json({ message: "Internal server error", error: error.message });
  }
});
export default router;
