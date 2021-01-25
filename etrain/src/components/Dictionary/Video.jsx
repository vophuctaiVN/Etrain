import React from 'react';
import YouTube from 'react-youtube';
 
class Video extends React.Component {
    constructor(props){
        super(props); 
        this._onReady = this._onReady.bind(this); 
      }
  render() {
    const opts = { 
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    };
 
    return <YouTube videoId={this.props.videoid} opts={opts} onReady={this._onReady} />;
  }
 
  _onReady(event) {
    const player = event.target;  
    console.log(this.props.second);    
    player.seekTo(this.props.second);
    player.pauseVideo();
  }
}

export default Video;