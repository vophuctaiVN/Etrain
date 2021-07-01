import React, { Component } from "react";
import GramLesson from "./GramLesson";
import MoreLesson from "./MoreLesson";
import GramQ from "./GramQ";
import { Link } from "react-router-dom";
import getWord from "../../utils/helpers";
import { isLogin } from "../../utils/helpers";

import Video from "../Dictionary/Video";

class GramPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      totalitems: 0,
      youtubeinfo: null,
      loginStt: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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
      .then(async (topic) => {
        var data = await getWord(topic.json.result.items[0].title);
        const x = await isLogin();
        window
          .LessonAPIsService_Query(queryObjContent)
          .then((result) =>
            this.setState({
              topics: topic.json.result.items[0],
              items: result.json.result.items,
              totalitems: result.json.result.totalRows,
              youtubeinfo: data.youtubeinfo,
              loginStt: x,
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
                    src={this.state.topics.imageURL}
                    alt=""
                  />
                ) : null}
              </div>
              {listLessons}

              {this.state.youtubeinfo !== null ? (
                <div className="single-post-area">
                  <div className="blog-author">
                    <Video
                      key={this.state.youtubeinfo.youtube_id}
                      second={this.state.youtubeinfo.start}
                      videoid={this.state.youtubeinfo.youtube_id}
                    />
                  </div>
                </div>
              ) : null}
              {this.state.loginStt ? (
                <>
                  <Link
                    to={`/speaking-${this.props.match.params.lessonid}`}
                    className="genric-btn success-border circle"
                    style={{
                      float: "right",
                      marginTop: "20px",
                      marginLeft: "10px",
                    }}
                  >
                    Speaking
                  </Link>
                  <Link
                    to={`/dictation-${this.props.match.params.lessonid}`}
                    className="genric-btn success-border circle"
                    style={{
                      float: "right",
                      marginTop: "20px",
                      marginLeft: "10px",
                    }}
                  >
                    Dictation
                  </Link>
                  <Link
                    to={`/orderwords-${this.props.match.params.lessonid}`}
                    className="genric-btn success-border circle"
                    style={{ float: "right", marginTop: "20px" }}
                  >
                    Order Sentense
                  </Link>
                </>
              ) : null}
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
