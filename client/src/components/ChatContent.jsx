import React from 'react'

function ChatContent(props) {
    const chatSide = props.sender
    //console.log(chatSide)
  return (
    <div
      style={
        chatSide
          ? { marginRight: "10px", justifySelf: "flex-end" }
          : { marginLeft: "10px", justifySelf: "flex-start" }
      }
      className="chat-massage"
    >
      <p className="chat-content">hello</p>
    </div>
  );
}

export default ChatContent