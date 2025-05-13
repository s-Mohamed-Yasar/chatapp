import React from "react";
import "../assets/App.css";
import defaultPic from "../assets/react.svg";
import { useSocketContext } from "../context/socketContext.jsx";
import { useState, useEffect } from "react";


function ContactCard(props) {
  //console.log(props.pic);
  // console.log(props);
  const [onlineUser, setOnlineUser] = useState(false);

  const pic = props.pic
  const name = props.name
  const userName = props.userName
  const gender = props.gender
  const userId = props.id

  const {onlineUsers} = useSocketContext();

  useEffect(() => {
    if (onlineUsers.includes(props.id)) {
      // console.log("online", props.id);
      setOnlineUser(true);
    } else {
      setOnlineUser(false);
    }
  }, [onlineUsers, props.id]);


  return (
    <div
      onClick={() => {
        props.clickedUser(props);
      }}
      className="con-card"
    >
      <div className="con-img relative">
        <img
          src={pic ? pic : defaultPic}
          alt="profile"
          className="w-12 h-12 rounded-full"
        />
        {onlineUser && <span className="online-dot "></span>}
      </div>

      <div className="con-name">
        {window.innerWidth > 480 && <h5>{userName}</h5>}
      </div>
    </div>
  );
}

export default ContactCard;
