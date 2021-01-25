import React from 'react';
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class SpeakerSound extends React.Component {  
    state = {
      play: false
    }
    audio = new Audio(this.props.url);
  
    componentDidMount() {
      this.audio.addEventListener('ended', () => this.setState({ play: false }));
    }
  
    componentWillUnmount() {
      this.audio.removeEventListener('ended', () => this.setState({ play: false }));  
    }
  
    togglePlay = () => {
      this.setState({ play: !this.state.play }, () => {
        this.state.play ? this.audio.play() : this.audio.pause();
      });
    }
  
    render() {
      return (
        <>
          {/* <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button> */}
          <FontAwesomeIcon icon={faVolumeUp} onClick={this.togglePlay}/>
        </>
      );
    }
  }
  
  export default SpeakerSound;