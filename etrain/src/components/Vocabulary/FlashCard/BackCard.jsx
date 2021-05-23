import React from "react";
import Speech from "react-speech";
import getWord from "../../../utils/helpers";

class BackCard extends React.Component {
  state = { Sentences: [], wordtitle: false, youtubeinfo: null };

  componentDidMount() {
    this.DicSearchClick(this.props.item.en);
  }

  async DicSearchClick(keyword) {
    var data = await getWord(keyword);
    let sentences = data.sentences;
    let examples = this.chose5examples(sentences);
    const listword = examples.map((sentence, index) => {
      return (
        <p key={index}>
          {sentence}{" "}
          <Speech
            text={sentence}
            pitch="1"
            rate="1"
            volume="1"
            lang="en-GB"
            voice="Google UK English Male"
          />
        </p>
      );
    });
    this.setState({
      Sentences: listword,
    });
  }

  chose5examples(sentences) {
    var i;
    let newArray = [];
    for (i = 3; i > 0 && newArray.length === 0; i--) {
      newArray = [];
      sentences.forEach((sentence) => {
        const english = sentence.fields.en
          .replaceAll("<em>", "")
          .replaceAll("</em>", "");
        if (english.match(/\w+/g).length > i) newArray.push(english);
      });
    }
    return newArray.slice(0, 3);
  }

  render() {
    let item = this.props.item;
    var divStyle = {
      height: "400px",
      width: "400px",
    };
    const array = this.state.Sentences;

    return (
      <article className="blog_item flashcard">
        <div className="blog_item_img">
          <img
            className="card-img rounded-0"
            src={item.imageURL}
            alt=""
            style={divStyle}
          />
          <a className="blog_item_date" href="# ">
            <p>{item.vn}</p>
          </a>
        </div>
        <div className="blog_details fullWidth">
          <h2>/{item.ipa}/ </h2>
          <h3>{item.type}</h3>
          {array}
        </div>
      </article>
    );
  }
}

export default BackCard;
