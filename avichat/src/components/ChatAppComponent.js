import React, { Component } from "react";
import InputTextComponent from "./InputTextComponent";
import firebase, { favorites, googleProvider } from "./firebase";
import MessageComponent from "./MessageComponent";

class ChatAppComponent extends Component {
  state = {
    messages: [],
    user: ""
  };

  // Runs when app starts and/or when page loads
  // "on" is to constantly listen to changes
  // Here we listen on changes on the databas and update the state
  // With the this.auth() we update our "user" state with the displayname of the logged in google account
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
    this.auth();
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
      timestamp: this.getCurrentDate(),
      sender: this.state.user
    };

    firebase
      .database()
      .ref(`messages/${nextMessage.id}`)
      .set(nextMessage);
  };

  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user.displayName });
    });
  };

  render() {
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <MessageComponent
          key={message.id}
          textvalue={message.text}
          timestamp={message.timestamp}
          getUser={message.sender}
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
