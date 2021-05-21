import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getRndInteger } from "../../utils/helpers";
class MoreLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //suggest
      suggest: [],
    };
  }

  componentDidMount() {
    const number = getRndInteger(1, 3);
    this.getRandGramList({
      PageNo: number,
      PageSize: 4,
    });
  }

  getRandGramList = (object) => {
    const { PageNo, PageSize } = object;
    const queryObj = {
      PageNo,
      PageSize,
    };
    window
      .GrammarAPIsService_Query(queryObj)
      .then((result) =>
        this.setState({
          suggest: result.json.result.items,
        })
      )
      .catch((error) => console.log(error));
  };
  render() {
    let suggested = this.state.suggest.map((suggest, index) => (
      <li>
        <a className="justify-content-between d-flex" ey={index}>
          <p>{suggest.title}</p>
          <span>
            <Link
              className="btn_2 text-uppercase"
              to={`/grammar-${suggest.id}`}
            >
              View Details
            </Link>
          </span>
        </a>
      </li>
    ));
    return (
      <div className="sidebar_top">
        <ul>{suggested}</ul>
        <Link to={`/grammar`} className="btn_1 d-block">
          View all grammar Posts
        </Link>
      </div>
    );
  }
}

export default MoreLesson;
