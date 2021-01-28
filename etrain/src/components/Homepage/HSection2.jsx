import React, { Component } from "react";
import { Link } from "react-router-dom";
import QuizTopic from '../Quiz/QuizTopic';

class HSection2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gramList: [],
      totalitems: 0,
      pageNo: 1,
      pageSize: 3,

      //pagination
      lastpage: 1,
    };
  }

  componentDidMount() {
    this.getGramList({
      PageNo: this.state.pageNo,
      PageSize: this.state.pageSize,
    });
  }

  getGramList = (object) => {
    const { PageNo, PageSize } = object;
    const queryObj = {
      PageNo,
      PageSize,
    };
    window
      .GrammarAPIsService_Query(queryObj)
      .then((result) =>
        this.setState({
          gramList: result.json.result.items,
          totalitems: result.json.result.totalRows,
          pageNo: PageNo,
          pageSize: PageSize,
          //pagination
          lastpage: Math.ceil(result.json.result.totalRows / PageSize),
        })
      )
      .catch((error) => console.log(error));
  };
  truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };
  render() {
    this.state.gramList.forEach((topicInfo) => {
      topicInfo.description = this.truncate(topicInfo.description);
    });
    let listopics = this.state.gramList.map((topicInfo) => (
      <QuizTopic
        id={topicInfo.id}
        title={topicInfo.title}
        note={topicInfo.description}
        key={Math.random()}
      />
    ));
    return (
      <section className="feature_part">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-xl-3 align-self-center">
              <div className="single_feature_text ">
                <h2>
                  Awesome <br /> Quizs
                </h2>
                <p>
                  Chose one topic you like and check how fluently you are in
                  English skils. Login to save your result.
                </p>
                <Link to={`/quizs`} className="btn_1">
                  Find More
                </Link>
              </div>
            </div>
            {listopics}
          </div>
        </div>
      </section>
    );
  }
}

export default HSection2;
