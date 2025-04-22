import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ContactCard from "../components/ContactCard";
import ChatContent from "../components/ChatContent";
import pic from "../assets/send-button.svg";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../context/socketContext";
import "../assets/App.css";

function ChatMainPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState();
  const [userClicked, setUserClicked] = useState(false);
  const [chatUser, setChatUser] = useState([]);
  const [allChat, setAllChat] = useState([]);
  const { socket } = useSocketContext();
  const navigate = useNavigate();
  const userId = localStorage.getItem("user-id");
  const jwtToken = getCookie("jwtToken");
  // if (!userId) {
  //   // navigate("/login");
  //   return;
  // }

  function checkAuth() {
    if (!userId || !jwtToken) {
      navigate("/login");
      return;
    }
  }

  useEffect(() => {
    checkAuth();

    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/saved/users", {
        withCredentials: true,
      });
      //console.log(res.data);

      flushSync(() => {
        setUsers(res.data);
      });
    };
    fetchData();
  }, []);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  useEffect(() => {
    checkAuth();
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:3000/get/user/chat/${chatUser.id}`,
        { withCredentials: true }
      );
      setAllChat(res.data);
      //console.log(allChat);
    };
    fetch();

    //console.log(chatUser.id);
  }, [userClicked, chatUser]);

  useEffect(() => {
    if (!socket) return;

    socket.on("chat message", (msg) => {
      console.log("message received", msg);
      setAllChat((prev) => [
        ...prev,
        {
          _id: uuidv4(),
          message: msg,
          receiverId: userId,
        },
      ]);
      // refreshChat(); // or append message live if you prefer
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket, chatUser]);

  async function refreshChat() {
    const res = await axios.get(
      `http://localhost:3000/get/user/chat/${chatUser.id}`,
      { withCredentials: true }
    );
    console.log(res.data);
    setAllChat(res.data);
  }

  // }

  const handleClick = async (clickedUserDetails) => {
    setAllChat([]);
    setChatUser(clickedUserDetails);
    setUserClicked(true);
  };

  function handleMessage(event) {
    const value = event.target.value;
    setMessage(value);
    //console.log(messages);
  }
  async function sendMessage() {
    if (message === "") return;

    const res = await axios.post(
      `http://localhost:3000/user/chat/${chatUser.id}`,
      { message: message },
      { withCredentials: true }
    );

    setMessage("");
    refreshChat();
  }
  return (
    <div className="contact-chat">
      <div className="contacts-div">
        <h3 className="con-title">Contacts </h3>

        {users?.length > 0 ? (
          users.map((user) => (
            <ContactCard
              clickedUser={handleClick}
              key={user._id}
              id={user._id}
              name={user.name}
              userName={user.userName}
              gender={user.gender}
              pic={user.profilePic}
            />
          ))
        ) : (
          <p>No contacts yet.</p> // Or a loading indicator
        )}
      </div>
      {userClicked ? (
        <div className="chat-div" style={{ paddingBottom: "100px" }}>
          <ContactCard
            name={chatUser.name}
            userName={chatUser.userName}
            id={chatUser._id}
            gendeer={chatUser.gender}
            pic={chatUser.pic}
          />

          <div className="message-div">
            {Array.isArray(allChat) && allChat.length > 0
              ? allChat.map((chat) => {
                  return (
                    <ChatContent
                      key={chat._id}
                      sender={userId === chat.senderId ? true : false}
                      message={chat.message}
                    />
                  );
                })
              : null}
          </div>
          <div className="send-coloum">
            <input
              className="message-input"
              onChange={handleMessage}
              value={message}
              placeholder="Message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            ></input>
            <div className="send-symbol">
              <img onClick={sendMessage} src={pic} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ChatMainPage;
