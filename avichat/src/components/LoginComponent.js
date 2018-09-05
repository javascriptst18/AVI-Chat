import React, { Component } from "react";
import firebase, { favorites, googleProvider } from "./firebase";

class LoginComponent extends Component {
  // state = {
  //   // State that gets the value of the logged in user. Starts as an empy string. This state was passed down from the App component
  //   username: ""
  // };

  logIn = () => {
    firebase.auth().signInWithPopup(googleProvider);
  };

  render() {
    return (
      <div>
        <button onClick={this.logIn}>Google Log In !</button>
      </div>
    );
  }
}

export default LoginComponent;
