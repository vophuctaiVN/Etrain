import React from "react";
import Speech from "react-speech";
import getWord from "../../../utils/helpers";

class BackCard extends React.Component {
  state = { Sentences: [], wordtitle: false, youtubeinfo: null };

  async DicSearchClick(keyword) {
    var data = await getWord(keyword);
    let sentences = data.sentences;
    const listword = sentences.map((sentence, index) => (
      <div key={index}>
        <p dangerouslySetInnerHTML={{ __html: sentence.fields.en }} />{" "}
        <Speech
          text={{ __html: sentence.fields.en }}
          pitch="1"
          rate="1"
          volume="1"
          lang="en-GB"
          voice="Google UK English Male"
        />
        <hr />
      </div>
    ));
    this.setState({
      Sentences: listword,
    });
  }

  render() {
    let item = this.props.item;
    this.DicSearchClick(this.props.item.en);
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
          <div className="row">{array}</div>
        </div>
      </article>
    );
  }
}

export default BackCard;
