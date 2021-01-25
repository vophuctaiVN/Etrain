import ReactCardFlip from "react-card-flip";
import React from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";
export class FlashCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    return (
      <>
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="vertical"
        >
          <div onClick={this.handleClick}>
            <FrontCard item = {this.props.item}></FrontCard>
          </div>
          <div onClick={this.handleClick}>
            <BackCard item = {this.props.item}></BackCard>
          </div>
        </ReactCardFlip>
      </>
    );
  }
}

export default FlashCard;
