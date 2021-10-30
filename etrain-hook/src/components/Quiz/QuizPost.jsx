import React, { useEffect, useState } from "react";
import Quiz from "react-quiz-component";
import GramQ from "../Grammar/GramQ";

function QuizPost(props) {
  const [quizPost, setQuizPost] = useState({
    items: [],
    totalitems: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getLesson(props.match.params.lessonid);
  }, []);

  const getLesson = (fatherID) => {
    const queryObj = {
      fatherID,
    };
    window
      .Quiz_byID_Query(queryObj)
      .then((result) =>
        setQuizPost({
          items: result.json.result.items,
          totalitems: result.json.result.totalRows,
        })
      )
      .catch((error) => console.log(error));
  };

  let item = quizPost.items[0];
  let quiz2;
  if (item != undefined) {
    quiz2 = {
      quizTitle: item.quizinfo.title,
      quizSynopsis: item.quizinfo.description,
      questions: [],
    };
    item.questions.forEach((q) => {
      var array_answers = q.answers.split(", ");

      var correctA = q.correctAnswer.split(", ");
      if (correctA.length === 1) correctA = correctA[0];
      else correctA = q.correctAnswer.split(", ").map(Number);

      let tempQuestion = {
        question: q.question,
        questionType: q.questionType,
        questionPic: q.questionPic,
        answerSelectionType: q.answerSelectionType,
        answers: array_answers,
        correctAnswer: correctA,
        messageForCorrectAnswer: "Correct answer. Good job.",
        messageForIncorrectAnswer: "Incorrect answer. Please try again.",
        explanation: q.explanation,
        point: "10",
      };

      quiz2.questions.push(tempQuestion);
    });
  }
  let quiz = {
    quizTitle: "React Quiz Component Demo",
    quizSynopsis:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
    questions: [],
  };
  let FullQuiz;
  if (quiz2) {
    quiz = quiz2;
    FullQuiz = (
      <Quiz
        quiz={quiz}
        shuffle={true}
        showDefaultResult={true}
        showInstantFeedback={true}
        continueTillCorrect={true}
      />
    );
  }

  return (
    <section className="blog_area section_padding">
      <div className="container">
        <div className="container">
          <div className="row justify-content-center">{FullQuiz}</div>
        </div>
        <div style={{ marginTop: "100px" }}>
          <GramQ />
        </div>
      </div>
    </section>
  );
}

export default QuizPost;
