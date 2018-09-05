import React, { Component } from "react";
import "./App.css";
// Import ChatAppComponent here
// Import LoginComponent here

class App extends Component {
  state = {
    // #1 state: current username
    // #2 state: is user logged in?
  };

  render() {
    if ("is user logged in? = true") {
      return <ChatAppComponent />;
    }
    if ("is user logged in? = false") {
      return <LoginComponent />;
    }
  }
}

export default App;
