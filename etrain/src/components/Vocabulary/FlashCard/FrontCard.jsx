import React from "react";
import Speech from "react-speech";

class FrontCard extends React.Component {
  render() {
    let item = this.props.item;
    var divStyle = {
      height: "400px",
      width: "400px",
    };
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
            <p>{item.en}</p>
          </a>
        </div>
        <div className="blog_details fullWidth">
          <h2>/{item.ipa}/</h2>
          <h3>
            <Speech
              text={item.en}
              pitch="1"
              rate="1"
              volume="1"
              lang="en-GB"
              voice="Google UK English Male"
            />
          </h3>
          <p>
            {item.example1}{" "}
            <Speech
              text={item.example1}
              pitch="1"
              rate="1"
              volume="1"
              lang="en-GB"
              voice="Google UK English Male"
            />
          </p>
        </div>
      </article>
    );
  }
}

export default FrontCard;
