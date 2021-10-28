import React, { Component } from "react";
import { Link } from "react-router-dom";

class RelatedWords extends Component {
  state = { items: [] };
  componentDidMount() {
    window
      .RelatedWordsQuery({ word: this.props.word })
      .then((result) => {
        let arrayWord = result.json;
        let newArray = [];
        arrayWord.map((element) => newArray.push(element.word));
        this.setState({
          items: newArray,
        });
      })
      .catch((error) => console.log(error));
  }
  render() {
    let items = this.state.items;
    let listvocab = items.map((item, index) => (
      <div className="col-sm-6 col-xl-3 listExample" key={index}>
        <Link to={`/dictionary-${item}`} key={index}>
          {item}
        </Link>
      </div>
    ));
    return (
      <div className="row listExample-boder" style={{ marginTop: "30px" }}>
        {listvocab}
      </div>
    );
  }
}

export default RelatedWords;
