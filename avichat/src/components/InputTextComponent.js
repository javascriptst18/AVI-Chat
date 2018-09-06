import React, { Component } from "react";

class InputTextComponent extends Component {
  state = {
    input: "",
    inputPlaceholder: "Write your message here and press enter"
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  // Clear input text (placeholder) on focus
  clearInput = () => {
    this.setState({ inputPlaceholder: "" });
  };

  // Sets input text (placeholder) when not focus (blur)
  setInput = () => {
    this.setState({
      inputPlaceholder: "Write your message here and press enter"
    });
  };

  render() {
    const { input } = this.state;
    return (
      <div>
        <input
          onFocus={this.clearInput}
          onBlur={this.setInput}
          type="text"
          value={this.state.input}
          placeholder={this.state.inputPlaceholder}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          onClick={() => {
            this.props.submitMessage(input);
            this.setState({ input: "" });
          }}
        >
          SEND
        </button>
      </div>
    );
  }
}

export default InputTextComponent;
