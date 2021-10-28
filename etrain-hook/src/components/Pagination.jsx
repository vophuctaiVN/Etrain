import React, { Component } from "react";

class Navigation extends Component {
  render() {
    let pageicons = [];
    let pageNo = this.props.pageinfo.pageNo;
    let lastpage = this.props.pageinfo.lastpage;
    let numberRange = 5;
    let breakRange = Math.floor(numberRange / 2);
    if (lastpage < numberRange) {
      let i;
      for (i = 1; i <= lastpage; i++) {
        pageicons.push(i);
      }
    } else {
      let i;
      switch (true) {
        case pageNo >= 1 && pageNo <= breakRange:
          for (i = 1; i <= numberRange; i++) pageicons.push(i);
          break;
        case pageNo > breakRange && pageNo < lastpage - breakRange:
          if (numberRange % 2 !== 0) {
            for (i = pageNo - breakRange; i <= pageNo + breakRange; i++)
              pageicons.push(i);
          }
          if (numberRange % 2 === 0) {
            for (i = pageNo - breakRange + 1; i <= pageNo + breakRange; i++)
              pageicons.push(i);
          }
          break;
        case pageNo >= lastpage - breakRange && pageNo <= lastpage:
          for (i = lastpage - (numberRange - 1); i <= lastpage; i++)
            pageicons.push(i);
          break;
        default:
          break;
      }
    }

    let listnumbers = pageicons.map((number) => (
      <li
        className={`page-item ${pageNo === number ? "active" : null}`}
        key={Math.random()}
      >
        <a
          className="page-link"
          onClick={() => this.props.handlePageChange("number", number)}
        >
          {number}
        </a>
      </li>
    ));

    return (
      <nav className="blog-pagination justify-content-center d-flex">
        <ul className="pagination">
          <li className={`page-item ${pageNo <= 1 ? "li_disabled" : null}`}>
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() => this.props.handlePageChange("pre", pageNo)}
            >
              <i className="ti-angle-left" />
            </a>
          </li>

          {listnumbers}

          <li
            className={`page-item ${pageNo >= lastpage ? "li_disabled" : null}`}
          >
            <a
              className="page-link"
              aria-label="Next"
              onClick={() => this.props.handlePageChange("next", pageNo)}
            >
              <i className="ti-angle-right" />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
