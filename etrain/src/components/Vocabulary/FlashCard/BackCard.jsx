import React from "react";

class BackCard extends React.Component {
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
            <p>{item.vn}</p>
          </a>
        </div>
        <div className="blog_details fullWidth">
          <h2>/{item.ipa}/ </h2>
          <h3>{item.type}</h3>
          <p>{item.example2}</p>
        </div>
      </article>
    );
  }
}

export default BackCard;
