import React from "react";
import { Link } from "react-router-dom";

function TopicCard(props) {
  return (
    <article className="blog_item">
      <div className="blog_item_img">
        <img
          className="card-img rounded-0 vocabtopic-image"
          src={props.imgUrl}
          alt=""
        />
        <a className="blog_item_date" href="# ">
          <p>{props.level}</p>
        </a>
      </div>
      <div className="blog_details">
        <Link to={`/vocabulary-${props.id}`}>
          {" "}
          <h2>{props.title}</h2>{" "}
        </Link>
        <p>{props.note}</p>
      </div>
    </article>
  );
}

export default TopicCard;
