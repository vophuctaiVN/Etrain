import React from "react";
import YouTube from "react-youtube";

function Video(props) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  const _onReady = (event) => {
    const player = event.target;
    player.seekTo(props.second);
    player.pauseVideo();
  };

  return <YouTube videoId={props.videoid} opts={opts} onReady={_onReady} />;
}

export default Video;
