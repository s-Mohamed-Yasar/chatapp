import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import ContactCard from "../components/ContactCard"
import ChatContent from "../components/ChatContent";
import Badge from "react-bootstrap/Badge";
import pic from "../assets/react.svg";

import "../assets/App.css";

function ChatMainPage() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);
  




  return (
    <div className="contact-chat">
      <div className="contacts-div">
        <h3 className="con-title">Contacts </h3>
        <ContactCard />
        <ContactCard />
      </div>
      <div className="chat-div">
        <ContactCard />

        <div className="message-div">
          <ChatContent sender={false} />
          <ChatContent sender={false} />
          <ChatContent sender={false} />
          <ChatContent sender={true} />
          <ChatContent sender={false} />
          <ChatContent sender={true} />
          <ChatContent sender={false} />
          <ChatContent sender={true} />
          <ChatContent sender={false} />
          <ChatContent sender={false} />
          <ChatContent sender={false} />
          <ChatContent sender={true} />
          <ChatContent sender={false} />
          <ChatContent sender={true} />
          <ChatContent sender={false} />
          <ChatContent sender={true} />
        </div>
        <div className="send-coloum">
          <input placeholder="Message..."></input>
          <div className="send-symbol">
            <img src={pic} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMainPage;
