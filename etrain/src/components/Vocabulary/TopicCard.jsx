import React from "react";
import { Link } from "react-router-dom";
class TopicCard extends React.Component {
  render() {
    return (
      <article className="blog_item">
        <div className="blog_item_img">
          <img
            className="card-img rounded-0 vocabtopic-image"
            src={this.props.imgUrl}
            alt=""
          />
          <a className="blog_item_date" href="# ">
            <p>{this.props.level}</p>
          </a>
        </div>
        <div className="blog_details">
          <Link
            to={{
              pathname: `/vocabulary-${this.props.id}`,
              query: {
                topic_Image: this.props.imgUrl,
              },
            }}
          >
            {" "}
            <h2>{this.props.title}</h2>{" "}
          </Link>
          <p>{this.props.note}</p>
        </div>
      </article>
    );
  }
}

export default TopicCard;
