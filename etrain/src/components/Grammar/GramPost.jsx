import React, { Component } from "react";
import GramLesson from "./GramLesson";
import MoreLesson from "./MoreLesson";
import GramQ from "./GramQ";
import { Link } from "react-router-dom";

class GramPost extends Component {
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

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.lessonid !== this.props.match.params.lessonid) {
      this.getLesson(this.props.match.params.lessonid);
    }
  }

  getLesson = (fatherID) => {
    const queryObjContent = {
      fatherID,
    };
    const queryObjTopic = {
      ID: fatherID,
    };
    window
      .GrammarAPIsService_Query(queryObjTopic)
      .then((topic) => {
        window
          .LessonAPIsService_Query(queryObjContent)
          .then((result) =>
            this.setState({
              topics: topic.json.result.items,
              items: result.json.result.items,
              totalitems: result.json.result.totalRows,
            })
          )
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  getAllExample() {
    let rawExample = [];
    this.state.items.forEach((section) => {
      rawExample = rawExample.concat(section.examples);
    });
    return rawExample;
  }

  render() {
    let listLessons = this.state.items.map((lesson, index) => (
      <GramLesson
        key={index}
        content={lesson.sectionContent}
        examples={lesson.examples}
      />
    ));

    return (
      <section className="course_details_area section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 course_details_left">
              <div className="main_image">
                {this.state.topics ? (
                  <img
                    className="img-fluid"
                    src={this.state.topics[0].imageURL}
                    alt=""
                  />
                ) : null}
              </div>
              {listLessons}
              <Link
                to={{
                  pathname: `/orderwords`,
                  query: {
                    items: this.getAllExample(),
                  },
                }}
                className="genric-btn success-border circle"
                style={{ float: "right", marginTop: "20px" }}
              >
                Order Sentense
              </Link>
            </div>

            <div className="col-lg-4 right-contents">
              <MoreLesson />
              <GramQ />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default GramPost;
