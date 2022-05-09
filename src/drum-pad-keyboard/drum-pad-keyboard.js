import React from "react";
import DrumPad from "../drum-pad/drum-pad";
import "./drum-pad-keyboard.css";

class DrumPadKeyboard extends React.Component {
  render() {
    return (
      <div id="drum-pads">
        {(this.props.bankCode === 1
          ? this.props.banks.bankOne
          : this.props.banks.bankTwo
        ).map((x) => (
          <DrumPad
            bankItem={x}
            updateDisplayText={this.props.updateDisplayText}
            volume={this.props.volume}
            powerOn={this.props.powerOn}
          />
        ))}
      </div>
    );
  }
}

export default DrumPadKeyboard;
