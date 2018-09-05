import React, { Component } from "react";
import firebase, { favorites, googleProvider } from "./firebase";

class ChatAppComponent extends Component {
  state = {
    message: "",
    messages: []
  };

  updateMessage = e => {
    this.setState({ message: e.target.value });
  };

  submitMessage = e => {
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message
    };

    firebase
      .database()
      .ref("messages/" + nextMessage.id)
      .set(nextMessage);
  };

  render() {
    return (
      <div>
        <h1>Welcome {this.props.username}</h1>
        <div>
          <input
            type="text"
            placeholder="Write your message and press enter"
            onChange={this.updateMessage}
          />
          <button onSubmit={this.submitMessage}>SEND</button>
        </div>
        <br />

        <button onClick={this.props.logOut}>{this.props.btnName}</button>
      </div>
    );
  }
}

export default ChatAppComponent;
