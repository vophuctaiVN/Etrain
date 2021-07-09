import React, { Component } from "react";
import { getRndInteger } from "../../utils/helpers";
import { Link } from "react-router-dom";
class HSection6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //suggest
      suggest: [],
    };
  }

  componentDidMount() {
    const number = getRndInteger(1, 6);
    this.getVocabList({
      PageNo: number,
      PageSize: 3,
    });
  }

  getVocabList = (object) => {
    const { PageNo, PageSize } = object;
    const queryObj = {
      PageNo,
      PageSize,
    };
    window
      .VocabularyAPIsService_Query(queryObj)
      .then((result) =>
        this.setState({
          suggest: result.json.result.items,
        })
      )
      .catch((error) => console.log(error));
  };
  truncate = (str) => {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
  };
  render() {
    this.state.suggest.forEach((topicInfo) => {
      topicInfo.description = this.truncate(topicInfo.description);
    });
    let suggest = this.state.suggest.map((vocab, index) => (
      <div className="col-sm-6 col-lg-4 col-xl-4" key={index}>
        <div className="single-home-blog">
          <div className="card">
            <img src={vocab.imageURL} className="card-img-top" alt="blog" />
            <div className="card-body">
              <a href="# " className="btn_4">
                {vocab.level}
              </a>

              <Link to={`/vocabulary-${vocab.id}`}>
                {" "}
                <h5 className="card-title">{vocab.title}</h5>{" "}
              </Link>
              <p>{vocab.description}</p>
            </div>
          </div>
        </div>
      </div>
    ));
    return (
      <section className="blog_part section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5">
              <div className="section_tittle text-center">
                <p>Our Posts</p>
                <h2>Vocab Topics</h2>
              </div>
            </div>
          </div>
          <div className="row">{suggest}</div>
        </div>
      </section>
    );
  }
}

export default HSection6;
