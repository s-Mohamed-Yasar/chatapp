import React from 'react'

function ChatContent(props) {
    const chatSide = props.sender
    //console.log(props.message);
    

    //console.log(chatSide)
  return (
    <div
      style={
        chatSide
          ? { marginLeft: "auto", marginRight: "10px" }
          : { marginRight: "auto", marginLeft: "10px" }
      }
      className="chat-massage"
    >
      <p className="chat-content">{props.message}</p>
    </div>
  );
}

export default ChatContent