import React, { Component } from "react";
import InputTextComponent from "./InputTextComponent";
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
        <InputTextComponent
          updateMessage={this.updateMessage}
          submitMessage={this.submitMessage}
        />
        <br />

        <button onClick={this.props.logOut}>{this.props.btnName}</button>
      </div>
    );
  }
}

export default ChatAppComponent;
