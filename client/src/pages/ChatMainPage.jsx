import { useState, useEffect,useRef } from "react";
import axios from "axios";
import ContactCard from "../components/ContactCard"
import ChatContent from "../components/ChatContent";
import pic from "../assets/react.svg";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";



import "../assets/App.css";
import Login from "./Login";

 function ChatMainPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState();
  const [userClicked, setUserClicked] = useState(false)
  const [chatUser, setChatUser] = useState([])
  const [allChat, setAllChat] = useState([])

   const navigate = useNavigate()
   
   const userId = localStorage.getItem("user-id")
   if (!userId) {
     navigate("/login")
     return
   }
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      
      const res = await axios.get("http://localhost:3000/saved/users", { withCredentials: true });
      //console.log(res.data);
      
      flushSync(()=>{
        setUsers(res.data)

      })
      
    };
    fetchData();
  }, []);
  

useEffect(()=>{
  const fetch = async ()=>{
    const res = await axios.get(`http://localhost:3000/get/user/chat/${chatUser.id}`, {withCredentials: true})
    setAllChat(res.data)
    //console.log(allChat);
  }
  fetch()
  
  //console.log(chatUser.id);
  
},[userClicked,chatUser])

async function refreshChat(){

  const res = await axios.get(`http://localhost:3000/get/user/chat/${chatUser.id}`, { withCredentials: true }) 
  console.log(res.data);
   setAllChat(res.data);
   }
  
// }

   const handleClick = async (clickedUserDetails) => {
    setAllChat([])
    setChatUser(clickedUserDetails)
    setUserClicked(true)  

};

function handleMessage(event){

  const value = event.target.value
  setMessage(value)
  //console.log(messages);
}
   async function sendMessage() {
  console.log("sending message");
  

    const res = await axios.post(`http://localhost:3000/user/chat/${chatUser.id}`,{message : message},{withCredentials: true}) 
    console.log(res.data);
    setMessage("")
    refreshChat()
    


}
  return (
    <div className="contact-chat">
      <div className="contacts-div">
        <h3 className="con-title">Contacts </h3>

        {users?.length > 0 ? (
       users.map((user) => (
           <ContactCard clickedUser={handleClick} key={user._id} id={user._id} name={user.name} userName={user.userName} gender={user.gender} pic={user.profilePic} />
           
       ))
   ) : (
       <p>No contacts yet.</p> // Or a loading indicator
   )}
        
      </div>
      {userClicked ? <div className="chat-div" style={{ paddingBottom: "100px", backgroundColor: "red" }}>
        <ContactCard name={chatUser.name} userName={chatUser.userName} id={chatUser._id} gendeer={chatUser.gender} pic={chatUser.pic} />

        <div className="message-div">
          { Array.isArray(allChat) && allChat.length > 0 ?  allChat.map((chat)=>{     
                   
          return <ChatContent key={chat._id} sender={userId === chat.senderId ? true : false}
          message={chat.message} />

          }): null}

    
        </div>
        <div className="send-coloum">
          <input onChange={handleMessage} value={message} placeholder="Message..."></input>
          <div  className="send-symbol">
            <img onClick={sendMessage} src={pic} />
          </div>
        </div>
      </div> : null }
      
    </div>
  );
}

export default ChatMainPage;
