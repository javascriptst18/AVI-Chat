import React, { Component } from "react";
import firebase, { favorites, googleProvider } from "./components/firebase";
import "./App.css";
import LoginComponent from "./components/LoginComponent";
// Import ChatAppComponent here

class App extends Component {
  state = {
    username: "",
    currentScreen: "LoginScreen"
  };

  componentDidMount() {
    this.auth();
  }

  // Listening if anyone logs in. Saves the logged in user in state
  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ username: this.state.username.displayName });
      } else {
        this.setState({ username: "" });
      }
    });
  };

  render() {
    // There is a logged in user = TRUE
    if (this.state.currentScreen === "AVIchat") {
      return <ChatAppComponent />;
    }
    // There is a logged in user = FALSE
    if (this.state.currentScreen === "LoginScreen") {
      return <LoginComponent username={this.state.username} />;
    }
  }
}

export default App;
