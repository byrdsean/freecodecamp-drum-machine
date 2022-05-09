import React from "react";
import DrumPadKeyboard from "../drum-pad-keyboard/drum-pad-keyboard";
import DrumControls from "../drum-controls/drum-controls";
import bankOne from "../resources/bankOne.json";
import bankTwo from "../resources/bankTwo.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "",
      powerOn: true,
      bankCode: 1,
      volume: 0.25,
    };
    this.updateDisplayText = this.updateDisplayText.bind(this);
    this.toggleBank = this.toggleBank.bind(this);
    this.togglePower = this.togglePower.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
  }

  componentDidMount() {
    this.updateDisplayText("");
  }

  togglePower() {
    this.setState({
      powerOn: !this.state.powerOn,
    });
  }

  updateDisplayText(newTxt) {
    let textValue =
      newTxt === null || newTxt === undefined || newTxt.length <= 0
        ? "Select Action"
        : newTxt;
    this.setState({ displayText: textValue });
  }

  toggleBank() {
    this.setState({
      bankCode: this.state.bankCode === 1 ? 2 : 1,
    });
  }

  updateVolume(newVolume) {
    this.setState({
      volume: 0 <= newVolume && newVolume <= 1 ? newVolume : 0.25,
    });
  }

  render() {
    return (
      <div id="drum-body">
        <div id="drum-machine">
          <DrumPadKeyboard
            updateDisplayText={this.updateDisplayText}
            banks={{ bankOne: bankOne, bankTwo: bankTwo }}
            bankCode={this.state.bankCode}
            volume={this.state.volume}
            powerOn={this.state.powerOn}
          />
          <DrumControls
            displayText={this.state.displayText}
            toggleBank={this.toggleBank}
            bankCode={this.state.bankCode}
            togglePower={this.togglePower}
            updateVolume={this.updateVolume}
            updateDisplayText={this.updateDisplayText}
          />
        </div>
      </div>
    );
  }
}

export default App;
