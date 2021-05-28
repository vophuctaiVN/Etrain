import React, { Component } from "react";
import { GramList } from "../Grammar/GramList";
import { getRndInteger } from "../../utils/helpers";
class HSection4 extends Component {
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
      PageSize: 3,
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
    return (
      <section className="special_cource padding_top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5">
              <div className="section_tittle text-center">
                <p>popular courses</p>
                <h2>Grammar Courses</h2>
              </div>
            </div>
          </div>
          <GramList gramList={this.state.suggest} />
        </div>
      </section>
    );
  }
}

export default HSection4;
