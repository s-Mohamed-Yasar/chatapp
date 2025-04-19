import express from "express";
import { verifyToken } from "../utilities/autorization.js";
import Message from "../db/message.schema.js";
import Conversation from "../db/conversation.schema.js";
//import { verify } from "jsonwebtoken";

const router = express.Router()

router.get("/:id",verifyToken,async(req, res)=>{

    const sender = req.user
    const receiverId = req.params.id
    //participants: { $all: ['671f240fcf78e66a3b070766', '671f2286543daba835bf7322'] },

        
    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [sender.userId._id, receiverId] },

        });
         if (!conversation) {
           conversation = await new Conversation({
             participants: [sender.userId._id, receiverId],
           });
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

})
export default router