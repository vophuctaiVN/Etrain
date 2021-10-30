import ReactCardFlip from "react-card-flip";
import React, { useEffect, useState } from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

export function FlashCard(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div onDoubleClick={handleClick}>
          <FrontCard item={props.item}></FrontCard>
        </div>
        <div onDoubleClick={handleClick}>
          <BackCard item={props.item}></BackCard>
        </div>
      </ReactCardFlip>
    </>
  );
}

export default FlashCard;
