import React, { Component } from "react";

class GramQ extends Component {
  render() {
    return (
      <>
        <h4 className="title">Question?</h4>
        <div className="content">
          <div className="feedeback">
            <textarea
              name="feedback"
              className="form-control"
              cols={10}
              rows={10}
              defaultValue={""}
            />
            <div className="mt-10 text-right">
              <a href="# " className="btn_1">
                Send your question
              </a>
            </div>
          </div>
          <div className="comments-area mb-30">
            <div className="comment-list">
              <div className="single-comment single-reviews justify-content-between d-flex">
                <div className="user justify-content-between d-flex">
                  <div className="thumb">
                    <img src="img/cource/cource_1.png" alt="" />
                  </div>
                  <div className="desc">
                    <h5>
                      <a href="# ">Emilly Blunt</a>
                    </h5>
                    <div className="rating">
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/star.svg" alt="" />
                      </a>
                    </div>
                    <p className="comment">
                      How many question can i make if i have 4 starts?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="comment-list">
              <div className="single-comment single-reviews justify-content-between d-flex">
                <div className="user justify-content-between d-flex">
                  <div className="thumb">
                    <img src="img/cource/cource_2.png" alt="" />
                  </div>
                  <div className="desc">
                    <h5>
                      <a href="# ">Elsie Cunningham</a>
                    </h5>
                    <div className="rating">
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/star.svg" alt="" />
                      </a>
                    </div>
                    <p className="comment">
                      I am just able to show 3 questions in that fiels. The
                      pictures will be smaller by length of question
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="comment-list">
              <div className="single-comment single-reviews justify-content-between d-flex">
                <div className="user justify-content-between d-flex">
                  <div className="thumb">
                    <img src="img/cource/cource_3.png" alt="" />
                  </div>
                  <div className="desc">
                    <h5>
                      <a href="# ">Maria Luna</a>
                    </h5>
                    <div className="rating">
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/color_star.svg" alt="" />
                      </a>
                      <a href="# ">
                        <img src="img/icon/star.svg" alt="" />
                      </a>
                    </div>
                    <p className="comment">
                      Is there any guys know how to make a sentenses from it?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GramQ;
