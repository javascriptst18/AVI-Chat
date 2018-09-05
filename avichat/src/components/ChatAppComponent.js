import React, { Component } from "react";

class ChatAppComponent extends Component {
  render() {
    return (
      <div>
        <p>HEJJJJJ</p>
        <button onClick={this.props.logOut}>{this.props.btnName}</button>
      </div>
    );
  }
}

export default ChatAppComponent;
