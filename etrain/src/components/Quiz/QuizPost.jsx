import React, { Component } from "react";
import Quiz from "react-quiz-component";
class QuizPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      totalitems: 0,
    };
  }

  componentDidMount() {
    this.getLesson(this.props.match.params.lessonid);
  }

  getLesson = (fatherID) => {
    const queryObj = {
      fatherID,
    };
    window
      .Quiz_byID_Query(queryObj)
      .then((result) =>
        this.setState({
          items: result.json.result.items,
          totalitems: result.json.result.totalRows,
        })
      )
      .catch((error) => console.log(error));
  };

  render() {
    let item = this.state.items[0];
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
          explanation: "This is your explaination.",
          point: "10",
        };

        quiz2.questions.push(tempQuestion);
      });
    }
    let quiz = {
      quizTitle: "React Quiz Component Demo",
      quizSynopsis:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
      questions: [
        /* {
          question:
            "How can you access the state of a component from inside of a member function?",
          questionType: "text",
          questionPic:
            "https://www.chicagotribune.com/resizer/hkMtMNUEhO4YvQZ6HAdP9q0XmI0=/800x1199/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/PTEBR3XY3ZFPJDLJKRQJAP3J44.jpg", // if you need to display Picture in Question
          answerSelectionType: "single",
          answers: [
            "this.getState()",
            "this.prototype.stateValue",
            "this.state",
            "this.values",
          ],
          correctAnswer: "3",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          explanation:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          point: "20",
        },
        {
          question: "ReactJS is developed by _____?",
          questionType: "text",
          questionPic: null,
          answerSelectionType: "single",
          answers: ["Google Engineers", "Facebook Engineers"],
          correctAnswer: "2",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          explanation:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          point: "20",
        },
        {
          question: "ReactJS is an MVC based framework?",
          questionType: "text",
          questionPic: null,
          answerSelectionType: "single",
          answers: ["True", "False"],
          correctAnswer: "2",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          explanation:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          point: "10",
        },
        {
          question: "Which of the following concepts is/are key to ReactJS?",
          questionType: "text",
          questionPic: null,
          answerSelectionType: "single",
          answers: [
            "Component-oriented design",
            "Event delegation model",
            "Both of the above",
          ],
          correctAnswer: "3",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          explanation:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          point: "30",
        },
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
          questionType: "photo",
          questionPic: null,
          answerSelectionType: "single",
          answers: [
            "https://media-exp1.licdn.com/dms/image/C510BAQE3c1apDb7xMQ/company-logo_200_200/0?e=2159024400&v=beta&t=kSN7BlSrG0dObnaorGM8QWbhHQcfVRzFwuHGjLd6DO4",
            "https://i.pinimg.com/favicons/7a627f330eedc6e0a128458b09b93d153ebd3399d34f4989390d7137.png?a09c3961b465dfac501a3f3561ea9186",
            "https://www.givengain.com/content_members/images/projects/gallery/1/8/8/6/1/KXOBZWRBYL_original.jpg",
            "https://dummyimage.com/600x400/000/fff&text=D",
          ],
          correctAnswer: "1",
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          explanation:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          point: "20",
        },
        {
          question: "What are the advantages of React JS?",
          questionType: "text",
          questionPic: null,
          answerSelectionType: "multiple",
          answers: [
            "React can be used on client and as well as server side too",
            "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
            "React components have lifecycle events that fall into State/Property Updates",
            "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer",
          ],
          correctAnswer: [1, 2, 4],
          messageForCorrectAnswer: "Correct answer. Good job.",
          messageForIncorrectAnswer: "Incorrect answer. Please try again.",
          explanation:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          point: "20",
        }, */
      ],
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
        />
      );
    }
    return ( 
      <section className="blog_area section_padding">
        <div className="container">
            <div className="container">
              <div className="row justify-content-center">{FullQuiz}</div>
            </div>
        </div>
      </section>
    );
    
  }
}

export default QuizPost;
