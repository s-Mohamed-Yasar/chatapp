import React from "react";
import "../assets/App.css";
import defaultPic from "../assets/react.svg";


function ContactCard(props) {
  //console.log(props.pic);
  
  const pic = props.pic
  const name = props.name
  const userName = props.userName
  const gender = props.gender

 
  return (
    <div onClick={()=>{
      props.clickedUser(props)
    }} className="con-card" >
      <div className="con-img">
        <img src={pic ? pic : defaultPic} />
      </div>
      <div className="con-name">
        <h5>{userName}</h5>
      </div>
    </div>
  );
}

export default ContactCard;
