import React, { Component } from "react";
import ScoreMain from "../MatchingWord/score";
import KeyBoardAndResult from "../MatchingWord/keyboard-result";
import Footer from "../MatchingWord/footer";
import ResultModal from "../MatchingWord/modal";

class OrderWords extends Component {
  state = {
    items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"],
    score: 0,
    currentQuestionIndex: 1,
    questionLimit: 10,
    questionTimeDuration: 10,
    message: "Good Job",
    hideReplay: true,
    //stopTimer: false,
    isOpen: false,
  };

  onDragStart = (e, index) => {
    this.draggedItem = this.state.items[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = (index) => {
    const draggedOverItem = this.state.items[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = this.state.items.filter((item) => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem);

    this.setState({ items });
  };

  onDragEnd = () => {
    this.draggedIdx = null;
  };

  render() {
    let DetailClose = () =>
      this.setState({ hideReplay: false, stopTimer: true, isOpen: false });
    return (
      <section className="blog_area section_padding">
        <div className="container">
          <div className="row justify-content-center order-background words-container">
            <div className="gamebackground">
              <ResultModal
                isOpen={this.state.isOpen}
                score={this.state.score}
                onHide={DetailClose}
              />
              <ScoreMain
                score={this.state.score}
                current={this.state.currentQuestionIndex}
                questionlimit={this.state.questionLimit}
                duration={this.state.questionTimeDuration}
                ontimeup={this.durationEnd}
                stopTimer={this.state.stopTimer}
              />

              <ul className="words-container">
                {this.state.items.map((item, idx) => (
                  <li
                    key={item}
                    onDragOver={() => this.onDragOver(idx)}
                    className="word-frame"
                  >
                    <div
                      draggable
                      onDragStart={(e) => this.onDragStart(e, idx)}
                      onDragEnd={this.onDragEnd}
                      style={{ backgroundColor: "red" }}
                    >
                      <span className="word-box">{item}</span>
                    </div>
                    {/* <span className="content">{item}</span> */}
                  </li>
                ))}
              </ul>
              <Footer
                hideReplay={this.state.hideReplay}
                onRefresh={this._playAgain}
                message={this.state.message}
                skipquestion={this._changeWord}
              />
            </div>{" "}
          </div>
        </div>
      </section>
    );
  }
}

export default OrderWords;
