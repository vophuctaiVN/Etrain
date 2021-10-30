import React, { Component } from "react";
import { Link } from "react-router-dom";

function GramTopic(props) {
  return (
    <div className="col-sm-6 col-lg-4" style={{ marginBottom: "30px" }}>
      <div className="single_special_cource">
        <img src={props.imgUrl} className="special_img" alt="" />
        <div className="special_cource_text">
          <a href="course-details.html" className="btn_4">
            {props.level}
          </a>
          <Link to={`/grammar-${props.id}`}>
            <h3>{props.title}</h3>
          </Link>
          <p>{props.note}</p>
        </div>
      </div>
    </div>
  );
}

export default GramTopic;
