import React from "react";
import Toggle from "../toggle/toggle";
import "./drum-controls.css";

class DrumControls extends React.Component {
  constructor(props) {
    super(props);
    this.updateVolume = this.updateVolume.bind(this);
  }

  updateVolume(e) {
    this.props.updateVolume(e.target.value / 100);
    this.props.updateDisplayText(`Volume ${e.target.value}%`);
  }

  render() {
    return (
      <div id="drum-controls">
        <Toggle toggleFunc={this.props.togglePower} displayTitle={"Power"} />
        <div id="display">{this.props.displayText}</div>
        <input
          type="range"
          min="0"
          max="100"
          id="volume-control"
          onChange={this.updateVolume}
        />
        <Toggle toggleFunc={this.props.toggleBank} displayTitle={"Bank"} />
      </div>
    );
  }
}

export default DrumControls;
