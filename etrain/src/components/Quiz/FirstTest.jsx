import React, { Component } from "react";
import Quiz from "react-quiz-component";
import Chart from "react-apexcharts";

class FirstTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      totalitems: 0,

      //chart
      series: [20],
      options: {
        chart: {
          height: 200,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%", //meanless
            },
          },
        },
        labels: ["Percentage"],
      },
    };
  }

  componentDidMount() {
    this.getLesson(45);
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
          explanation: "You did it well, I know you understand it.",
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

    const renderCustomResultPage = (obj) => {
      const percentage = [
        (obj.numberOfCorrectAnswers * 100) / obj.numberOfQuestions,
      ];

      const listLevelInfo = [
        {
          scoreFrom: 0,
          scoreTo: 30,
          level: "A1",
          levelName: "Beginer",
          levelExplain:
            "Can interact in a simple way provided the other person talks slowly and clearly and is prepared to help",
          grammarExplain:
            "Can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type",
          vocabExplain:
            "Can introduce him/herself and others and can ask and answer questions about personal details such as where he/she lives, people he/she knows and things he/she has",
        },
        {
          scoreFrom: 31,
          scoreTo: 48,
          level: "A2",
          levelName: "Elementary",
          levelExplain:
            "Can communicate in simple and routine tasks requiring a simple and direct exchange of information on familiar and routine matters",
          grammarExplain:
            "Can describe in simple terms aspects of his/her background, immediate environment and matters in areas of immediate need",
          vocabExplain:
            "Can understand sentences and frequently used expressions related to areas of most immediate relevance (e.g. very basic personal and family information, shopping, local geography, employment)",
        },
        {
          scoreFrom: 49,
          scoreTo: 64,
          level: "B1",
          levelName: "Pre-Intermediate",
          levelExplain:
            "Can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc. Can deal with most situations likely to arise whilst travelling in an area where the language is spoken",
          grammarExplain:
            "Can produce simple connected text on topics which are familiar or of personal interest",
          vocabExplain:
            "Can describe experiences and events, dreams, hopes & ambitions and briefly give reasons and explanations for opinions and plans",
        },
        {
          scoreFrom: 65,
          scoreTo: 78,
          level: "B2",
          levelName: "Intermediate",
          levelExplain:
            "Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party",
          grammarExplain:
            " Can produce clear, detailed text on a wide range of subjects and explain a viewpoint on a topical issue giving the advantages and disadvantages of various options",
          vocabExplain:
            "Can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in his/her field of specialisation",
        },
        {
          scoreFrom: 79,
          scoreTo: 90,
          level: "C1",
          levelName: "Upper Intermediate",
          levelExplain:
            "Can understand a wide range of demanding, longer texts, and recognise implicit meaning. Can express him/herself fluently and spontaneously without much obvious searching for expressions",
          grammarExplain:
            "Can produce clear, well-structured, detailed text on complex subjects, showing controlled use of organisational patterns, connectors and cohesive devices",
          vocabExplain:
            "Can use language flexibly and effectively for social, academic and professional purposes",
        },
        {
          scoreFrom: 91,
          scoreTo: 100,
          level: "C2",
          levelName: "Advanced",
          levelExplain:
            "	Can understand with ease virtually everything heard or read",
          grammarExplain:
            "Can summarise information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation",
          vocabExplain:
            "Can express him/herself spontaneously, very fluently and precisely, differentiating finer shades of meaning even in more complex situations",
        },
      ];

      const userLevelInfo = listLevelInfo.filter(
        (levelInfo) =>
          levelInfo.scoreFrom <= percentage[0] &&
          percentage[0] <= levelInfo.scoreTo
      )[0];

      const cardInfoList = listLevelInfo.map((levelInfo) => (
        <div className="col-md-4 col-lg-4">
          <div
            className="blog_details"
            style={{
              backgroundColor:
                levelInfo.level === userLevelInfo.level ? "lightblue" : null,
            }}
          >
            <h2>{levelInfo.level}</h2>
            <h5>{levelInfo.levelName}</h5>
            <p>
              {levelInfo.scoreFrom}-{levelInfo.scoreTo}%
            </p>
          </div>
        </div>
      ));

      return (
        <div className="row align-items-sm-center align-items-lg-stretch">
          <div className="col-md-3 col-lg-3">
            <div className="blog_details">
              <h2>Your Level</h2>
              <h5>Intermidiate</h5>
              <Chart
                options={this.state.options}
                series={percentage}
                type="radialBar"
                width="200"
              />
              <p>
                You got {obj.numberOfCorrectAnswers}/{obj.numberOfQuestions}{" "}
                correct answers
              </p>
            </div>
          </div>
          <div className="col-md-9 col-lg-9">
            <div className="blog_details">
              <h2>Your Score Explained</h2>
              <p>
                Your score indicates that your level of English is{" "}
                {userLevelInfo.level} {userLevelInfo.levelName}, according to
                the guidelines set by the Common Euroupe Framework of Reference
                (CEFR).
              </p>
              <br />
              <p>{userLevelInfo.levelExplain}</p>
              <div className="row align-items-sm-center align-items-lg-stretch">
                <div className="col-md-3 col-lg-3 containerCenter">
                  <Chart
                    options={this.state.options}
                    series={percentage}
                    type="radialBar"
                    width="200"
                  />
                </div>
                <div className="col-md-9 col-lg-9">
                  <div className="blog_details">
                    <h2>
                      <span className="ti-pencil-alt" />
                      Grammar Level Explained
                    </h2>
                    <p>{userLevelInfo.grammarExplain}</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row align-items-sm-center align-items-lg-stretch">
                <div className="col-md-3 col-lg-3 containerCenter">
                  <Chart
                    options={this.state.options}
                    series={percentage}
                    type="radialBar"
                    width="200"
                  />
                </div>
                <div className="col-md-9 col-lg-9">
                  <div className="blog_details">
                    <h2>
                      <span className="ti-ruler-pencil" />
                      Vocabulary Level Explained
                    </h2>
                    <p>{userLevelInfo.vocabExplain}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="blog_details">
              <h2>Quick Check Score Table</h2>
              <div className="row align-items-sm-center align-items-lg-stretch">
                {cardInfoList}
              </div>
            </div>
          </div>
        </div>
      );
    };

    if (quiz2) {
      quiz = quiz2;
      FullQuiz = (
        <Quiz
          quiz={quiz}
          shuffle={true}
          showDefaultResult={false}
          showInstantFeedback={true}
          customResultPage={renderCustomResultPage}
          onComplete={renderCustomResultPage}
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

export default FirstTest;
