import React, { Component } from "react";
import InputTextComponent from "./InputTextComponent";
import firebase, { favorites, googleProvider } from "./firebase";

class ChatAppComponent extends Component {
  state = {
    message: "",
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

  updateMessage = e => {
    this.setState({ message: e.target.value });
  };

  submitMessage = value => {
    const nextMessage = {
      id: this.state.messages.length,
      text: value
    };

    firebase
      .database()
      .ref("messages/" + nextMessage.id)
      .set(nextMessage);
  };

  render() {
    const currentMessage = this.state.messages.map((message, i) => {
      return <li key={message.id}>{message.text}</li>;
    });
    return (
      <div>
        <h1>Welcome {this.props.username}</h1>
        <ol>{currentMessage}</ol>
        <br />
        <InputTextComponent
          inputText={this.state.message}
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
