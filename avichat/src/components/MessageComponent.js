import React, { Component } from "react";

// Om jag tar bort key={props.key} får jag inget varning i consolen längre

function MessageComponent(props) {
  return (
    <div>
      <p key={props.key}>{props.getUser}</p>
      <p>{props.textvalue}</p>
      <p>{props.timestamp}</p>
    </div>
  );
}

export default MessageComponent;
