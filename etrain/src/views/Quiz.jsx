import React from "react";
import Pagination from "../components/Pagination";
import QuizList from "../components/Quiz/QuizList";
export class QuizPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gramList: [],
      totalitems: 0,
      pageNo: 1,
      pageSize: 7,

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
      .QuizAPIsService_Query(queryObj)
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
      <section className="feature_part" style={{ marginTop: 100 }}>
        <div className="container">
          <QuizList gramList={this.state.gramList}></QuizList>
          <Pagination
            handlePageChange={this.handlePageChange}
            pageinfo={this.state}
          />
          <br />
          <br />
        </div>
      </section>
    );
  }
}

export default QuizPage;
