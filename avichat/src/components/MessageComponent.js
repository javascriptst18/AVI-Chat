import React, { Component } from "react";

// Om jag tar bort key={props.key} får jag inget varning i consolen längre

function MessageComponent(props) {
  let messageDelete;
  if (props.getUser === "Vicente Tirado" || "Alan Habib" || "Igor Semiz") {
    messageDelete = <button>Delete This Message</button>;
  }
  return (
    <div>
      <p key={props.key}>{props.getUser}</p>
      <p>{props.textvalue}</p>
      <p>{props.timestamp}</p>
      {messageDelete}
    </div>
  );
}

export default MessageComponent;
