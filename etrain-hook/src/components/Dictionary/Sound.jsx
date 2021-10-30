import React, { useEffect, useState } from "react";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SpeakerSound(props) {
  const [play, setPlay] = useState(false);
  let audio = new Audio(props.url);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlay(false));
    return () => audio.removeEventListener("ended", () => setPlay(false));
  }, []);

  const togglePlay = () => {
    setPlay(!play, () => {
      play ? audio.play() : audio.pause();
    });
  };

  return <FontAwesomeIcon icon={faVolumeUp} onClick={togglePlay} />;
}

export default SpeakerSound;
