import React, { Component } from "react";

function MessageComponent(props) {
  return (
    <div>
      <p key={props.key}>{props.textvalue}</p>
      <p>{props.timestamp}</p>
    </div>
  );
}

export default MessageComponent;
