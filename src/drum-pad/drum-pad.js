import React from "react";

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

export default DrumPad;
