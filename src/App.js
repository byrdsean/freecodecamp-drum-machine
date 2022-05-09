import React from "react";

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

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioObj: null,
      playing: false,
    };
    this.playAudio = this.playAudio.bind(this);
  }

  componentDidMount() {
    let audioObj = document.getElementById(this.props.bankItem.keyTrigger);
    this.setState({
      audioObj: audioObj,
    });

    document.addEventListener("keydown", (e) => {
      if (e.which === this.props.bankItem.keyCode) {
        this.playAudio();
      }
    });
  }

  playAudio() {
    if (this.props.powerOn) {
      this.setState({ playing: true });
      this.state.audioObj.volume = this.props.volume;
      this.state.audioObj.play();
      this.props.updateDisplayText(this.props.bankItem.id.replace(/-/g, " "));
      setTimeout(() => {
        this.setState({ playing: false });
      }, 200);
    } else {
      this.props.updateDisplayText("Power: OFF");
    }
  }

  render() {
    return (
      <button
        id={this.props.bankItem.id}
        onClick={this.playAudio}
        className={`drum-pad ${this.state.playing ? "playing" : ""}`}
      >
        <audio
          src={this.props.bankItem.url}
          class="clip"
          id={this.props.bankItem.keyTrigger}
        />
        {this.props.bankItem.keyTrigger}
      </button>
    );
  }
}

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

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

export default App;
