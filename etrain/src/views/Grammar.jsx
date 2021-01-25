import React, { Component } from "react";
import GramList from "../components/Grammar/GramList";
import Pagination from "../components/Pagination";
class Grammar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gramList: [],
      totalitems: 0,
      pageNo: 1,
      pageSize: 6,

      //pagination
      lastpage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
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

  handlePageChange = (type, pageNo) => {
    switch (type) {
      case "next":
        this.getGramList({ PageNo: pageNo + 1, PageSize: this.state.pageSize });
        break;
      case "pre":
        this.getGramList({ PageNo: pageNo - 1, PageSize: this.state.pageSize });
        break;
      case "number":
        this.getGramList({ PageNo: pageNo, PageSize: this.state.pageSize });
        break;
      default:
        break;
    }
  };

  render() { 
    return (
      <>
        <section className="special_cource padding_top">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-5">
                <div className="section_tittle text-center">
                  <p>popular courses</p>
                  <h2>Special Courses</h2>
                </div>
              </div>
            </div>

            <GramList gramList={this.state.gramList} />
            <Pagination
              handlePageChange={this.handlePageChange}
              pageinfo={this.state}
            />
            <br />
            <br />
          </div>
        </section>
      </>
    );
  }
}

export default Grammar;
