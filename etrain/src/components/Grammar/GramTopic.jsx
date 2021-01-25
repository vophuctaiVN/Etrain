import React, { Component } from "react";
import { Link } from "react-router-dom";

class GramTopic extends Component {
  render() {
    return (
      <div className="col-sm-6 col-lg-4" style={{ marginBottom: "30px" }}>
        <div className="single_special_cource">
          <img src={this.props.imgUrl} className="special_img" alt="" />
          <div className="special_cource_text">
            <a href="course-details.html" className="btn_4">
              {this.props.level}
            </a>
            <Link
              to={{
                pathname: `/grammar-${this.props.id}`,
                query: {
                  topic_Image: this.props.imgUrl,
                },
              }}
            >
              <h3>{this.props.title}</h3>
            </Link>
            <p>{this.props.note}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default GramTopic;
