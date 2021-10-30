import React, { useEffect, useState } from "react";
import Footer from "../MatchingWord/footer";
import $ from "jquery";
import Speech from "react-speech";

let examples = [];
let items = [];
function Dictation(props) {
  const [dictaion, setDictation] = useState({});

  useEffect(() => {
    getInitialState();
    window.scrollTo(0, 0);
  }, []);

  const itemByCharacter = (exampleProps) => {
    const items = [];
    exampleProps.forEach((object) => {
      let setence =
        object.example.split(/(?<=\.)/) ||
        object.example.split(/(?<=\?)/) ||
        object.example.split(/(?<=\!)/);
      items.push(setence[0]);
    });
    return items;
  };

  const getAllExample = (lesson) => {
    let rawExample = [];
    lesson.forEach((section) => {
      rawExample = rawExample.concat(section.examples);
    });
    return rawExample;
  };

  const getInitialState = async () => {
    let lesson;
    await window
      .LessonAPIsService_Query({
        fatherID: props.match.params.lessonid,
      })
      .then((result) => (lesson = result.json.result.items))
      .catch((error) => console.log(error));
    examples = getAllExample(lesson);
    items = itemByCharacter(examples);

    var self = this;
    window.addEventListener("wordmatched", function (event) {
      if (window.interval !== undefined) {
        clearInterval(window.interval);
      }

      self._showMessage("success");
      setTimeout(function () {
        $("#message").hide(100);
        self._changeWord();
      }, 2000);
    });

    setDictation({
      ...dictaion,
      currentQuestionIndex: 1,
      questionLimit: items.length,
      message: "Ooops 😩",
      hideReplay: true,
    });
  };

  const _showMessage = (type) => {
    clearInterval(window.interval);
    if (type == "success") {
      setDictation({ ...dictaion, message: "Good Job 🥰" });
    } else {
      setDictation({ ...dictaion, message: "Ooops 😩" });
    }
    $("#message").show(200);
  };

  const _changeWord = () => {
    if (document.getElementById("dictationInput"))
      document.getElementById("dictationInput").value = "";
    if (window.interval !== undefined) {
      clearInterval(window.interval);
    }
    if (dictaion.currentQuestionIndex < dictaion.questionLimit) {
      setDictation({
        ...dictaion,
        currentQuestionIndex: dictaion.currentQuestionIndex + 1,
      });
    } else {
      clearInterval(window.interval);
      setDictation({ ...dictaion, hideReplay: false });
    }
  };

  const durationEnd = () => {
    _changeWord();
  };

  const _playAgain = () => {
    if (document.getElementById("dictationInput"))
      document.getElementById("dictationInput").value = "";
    clearInterval(window.interval);
    setDictation({
      ...dictaion,
      currentQuestionIndex: 1,
      questionLimit: items.length,
      message: "Good Job 🥰",
      hideReplay: true,
    });
  };

  const nowSentence = items[dictaion.currentQuestionIndex - 1];

  return (
    <>
      {nowSentence !== undefined ? (
        <section className="blog_area section_padding">
          <div className="container">
            <div className="row justify-content-center words-container gamebackground">
              <WordsArray
                sentence={nowSentence}
                image={examples[dictaion.currentQuestionIndex - 1].imageURL}
                showMessage={_showMessage}
              />
              <Footer
                hideReplay={dictaion.hideReplay}
                onRefresh={_playAgain}
                message={dictaion.message}
                skipquestion={_changeWord}
              />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function WordsArray(props) {
  const wordChecking = (inputValue) => {
    if (inputValue === props.sentence) {
      if (window.interval !== undefined) {
        clearInterval(window.interval);
      }
      window.dispatchEvent(new Event("wordmatched"));
    } else {
      props.showMessage("wrong");
      setTimeout(function () {
        $("#message").hide(100);
      }, 2000);
    }
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let inputValue = document.getElementById("dictationInput").value;
      wordChecking(inputValue);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="container-fluid">
          <img
            src={props.image}
            style={{
              maxHeight: "400px",
              maxWidth: "400px",
              marginTop: "10px",
            }}
          />
        </div>
        <div
          className="dictation"
          style={{ marginTop: "10px", display: "block" }}
        >
          <Speech
            text={props.sentence}
            pitch="1"
            rate="1"
            volume="1"
            lang="en-GB"
            voice="Google UK English Male"
          />
        </div>
      </div>
      <section className="container-fluid main-area">
        <div className="rowKA">
          <div className="col-md-12">
            <div className="question">
              <input
                onKeyDown={_handleKeyDown}
                id="dictationInput"
                placeholder="Required to add . for affirmative sentences and ? for the question"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dictation;
