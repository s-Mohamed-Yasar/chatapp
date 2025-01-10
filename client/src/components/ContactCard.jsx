import React from "react";
import "../assets/App.css";
import pic from "../assets/react.svg";


function ContactCard(props) {
  return (
    <div className="con-card" >
      <div className="con-img">
        <img src={pic} />
      </div>
      <div className="con-name">
        <h5>user name</h5>
      </div>
    </div>
  );
}

export default ContactCard;
