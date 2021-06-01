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
      <Link
        to={`/dictionary-${item}`}
        key={index}
        style={{ marginRight: "30px", display: "inline" }}
      >
        {item}
      </Link>
    ));
    return <>{listvocab}</>;
  }
}

export default RelatedWords;
