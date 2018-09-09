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
      .ref("/messages")
      .on("child_added", snapshot => {
        const currentMessages = [...this.state.messages];
        currentMessages.push(snapshot.val());
        this.setState({ messages: currentMessages });
      });
    firebase
      .database()
      .ref("/messages")
      .on("child_removed", snapshot => {
        const removedMessage = snapshot.val();
        const currentMessagesAfterRemove = this.state.messages.filter(item => {
          return item.key !== removedMessage.key;
        });
        this.setState({ messages: currentMessagesAfterRemove });
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
      sender: this.state.user,
      timestamp: this.getCurrentDate(),
      uniquePostId: firebase.database.ServerValue.TIMESTAMP,
      text: value // argument passed in submitMessage function
    };

    firebase
      .database()
      .ref(`/messages`)
      .push(nextMessage);
  };

  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user.displayName });
    });
  };

  // This function gets called when the admin deletemessage is clicked. It deletes the message from the database
  deleteMessage = del => {
    firebase
      .database()
      .ref(`/messages/${del}`) // del = message id som vi vill ta bort
      .remove();
    console.log("test delete message button");
  };

  currentMessage = messagesArray => {
    return messagesArray.map(message => (
      <MessageComponent
        key={message.uniquePostId}
        textvalue={message.text}
        timestamp={message.timestamp}
        getSender={message.sender}
        user={this.state.user}
        deleteMessage={this.deleteMessage}
      />
    ));
  };

  render() {
    return (
      <div>
        <h1>Welcome {this.state.user}</h1>
        <ol>{this.currentMessage(this.state.messages)}</ol>
        <br />
        <InputTextComponent submitMessage={this.submitMessage} />
        <br />

        <button onClick={this.props.logOut}>{this.props.btnName}</button>
      </div>
    );
  }
}

export default ChatAppComponent;
