import React, { Component } from "react";

class InputTextComponent extends Component {
  state = {
    inputPlaceholder: "Write your message here and press enter"
  };

  // Clear input text on focus
  clearInput = () => {
    this.setState({ inputPlaceholder: "" });
  };

  setInput = () => {
    this.setState({
      inputPlaceholder: "Write your message here and press enter"
    });
  };

  render() {
    return (
      <div>
        <form>
          <input
            onFocus={this.clearInput}
            onBlur={this.setInput}
            type="text"
            placeholder={this.state.inputPlaceholder}
            onChange={this.props.updateMessage}
          />
          <button type="submit" onSubmit={this.props.submitMessage}>
            SEND
          </button>
        </form>
      </div>
    );
  }
}

export default InputTextComponent;
