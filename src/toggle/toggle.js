import React from "react";
import "./toggle.css";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true,
    };
    this.toggleButton = this.toggleButton.bind(this);
  }

  toggleButton() {
    this.props.toggleFunc();
    this.setState({ on: !this.state.on });
  }

  render() {
    return (
      <div class="toggleBtnGroup">
        <p class="title">{this.props.displayTitle}</p>
        <div class="toggleBtn" onClick={this.toggleButton}>
          <div className={`on ${this.state.on ? "active" : ""}`}></div>
          <div className={`off ${this.state.on ? "" : "active"}`}></div>
        </div>
      </div>
    );
  }
}

export default Toggle;
