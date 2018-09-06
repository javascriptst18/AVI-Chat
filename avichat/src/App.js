import React, { Component } from "react";
import firebase, { favorites, googleProvider } from "./components/firebase";
import "./App.css";
import LoginComponent from "./components/LoginComponent";
import ChatAppComponent from "./components/ChatAppComponent";

class App extends Component {
  state = {
    username: "",
    currentScreen: "LoginScreen",
    btnName: "Google Log in"
  };

  componentDidMount() {
    this.auth();
  }

  // Listening if anyone logs in. Saves the logged in user in state
  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          username: user.displayName,
          currentScreen: "AVIchat",
          btnName: "Log out"
        });
      } else {
        this.setState({
          username: "",
          currentScreen: "LoginScreen",
          btnName: "Google Log in"
        });
      }
    });
  };

  // We send this method down to the children ChatAppComponent
  logOut = () => {
    firebase.auth().signOut();
  };

  // We send this method down to the children LoginComponent
  logIn = () => {
    firebase.auth().signInWithPopup(googleProvider);
  };

  render() {
    // There is a logged in user = TRUE
    if (this.state.currentScreen === "AVIchat") {
      return (
        <ChatAppComponent
          btnName={this.state.btnName}
          logOut={this.logOut}
          username={this.state.username}
        />
      );
    }
    // There is a logged in user = FALSE
    if (this.state.currentScreen === "LoginScreen") {
      return <LoginComponent btnName={this.state.btnName} logIn={this.logIn} />;
    }
  }
}

export default App;
