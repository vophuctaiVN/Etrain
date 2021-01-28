import React, { Component } from "react";
import GramLesson from "./GramLesson";
import MoreLesson from "./MoreLesson";
import GramQ from "./GramQ";
class GramPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      totalitems: 0,
    };
  }

  componentDidMount() { 
    if(this.props.location.query && this.props.location.query.topic_Image) localStorage.setItem('tempimg', this.props.location.query.topic_Image);
    this.getLesson(this.props.match.params.lessonid);
  }

  componentWillUnmount() { 
    localStorage.removeItem("tempimg");
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if(prevProps.match.params.lessonid !== this.props.match.params.lessonid){
      this.getLesson(this.props.match.params.lessonid);
      //localStorage.removeItem("tempimg");
    }
    if (this.props.location.query && this.props.location.query.topic_Image)
      localStorage.setItem("tempimg", this.props.location.query.topic_Image);
  }

  getLesson = (fatherID) => {
    const queryObj = {
      fatherID,
    };
    window
      .LessonAPIsService_Query(queryObj)
      .then((result) =>
        this.setState({
          items: result.json.result.items,
          totalitems: result.json.result.totalRows,
        })
      )
      .catch((error) => console.log(error));
  };
  render() {
    let listLessons = this.state.items.map((lesson) => (
      <GramLesson
        key={Math.random()}
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
                <img
                  className="img-fluid"
                  src={localStorage.getItem("tempimg")}
                  alt=""
                />
              </div>
              {listLessons}
            </div>

            <div className="col-lg-4 right-contents">
              <MoreLesson />
              {/* <GramQ /> */}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default GramPost;
