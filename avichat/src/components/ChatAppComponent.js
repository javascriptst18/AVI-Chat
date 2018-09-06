import React, { Component } from "react";
import InputTextComponent from "./InputTextComponent";
import firebase, { favorites, googleProvider } from "./firebase";
import MessageComponent from "./MessageComponent";

class ChatAppComponent extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    firebase
      .database()
      .ref("messages/")
      .on("value", snapshot => {
        const currentMessages = snapshot.val();
        if (currentMessages != null) {
          this.setState({ messages: currentMessages });
        }
      });
  }

  // Timestamp function that will be called everytime we submit a new message
  getCurrentDate = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return `${date}, ${time}`;
  };

  submitMessage = value => {
    const nextMessage = {
      id: this.state.messages.length,
      text: value,
      timestamp: this.getCurrentDate()
    };

    firebase
      .database()
      .ref("messages/" + nextMessage.id)
      .set(nextMessage);
  };

  render() {
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <MessageComponent
          key={message.id}
          textvalue={message.text}
          timestamp={message.timestamp}
        />
      );
    });
    return (
      <div>
        <h1>Welcome {this.props.username}</h1>
        <ol>{currentMessage}</ol>
        <br />
        <InputTextComponent submitMessage={this.submitMessage} />
        <br />

        <button onClick={this.props.logOut}>{this.props.btnName}</button>
      </div>
    );
  }
}

export default ChatAppComponent;
