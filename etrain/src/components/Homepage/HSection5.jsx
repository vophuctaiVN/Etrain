import React, { Component } from "react";

class HSection5 extends Component {
  render() {
    return (
      <section className="advance_feature learning_part">
        <div className="container">
          <div className="row align-items-sm-center align-items-xl-stretch">
            <div className="col-md-6 col-lg-6">
              <div className="learning_member_text">
                <h5>Advance feature</h5>
                <h2>Our Advance Educator Learning System</h2>
                <p>
                  We try to create an easier way for you to study english
                  everyday. Check it whenever and wherever you want. Don't be
                  shy with your mistakes. Study more and more. There is no
                  faster way for learning language.
                </p>
                <div className="row">
                  <div className="col-sm-6 col-md-12 col-lg-6">
                    <div className="learning_member_text_iner">
                      <span className="ti-pencil-alt" />
                      <h4>Learn Anywhere</h4>
                      <p>
                        You can study in any devices have internet connection.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-12 col-lg-6">
                    <div className="learning_member_text_iner">
                      <span className="ti-stamp" />
                      <h4>Nice Community</h4>
                      <p>
                        There are friends who are studying with you. You can ask
                        them any question.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="learning_img">
                <img src="img/advance_feature_img.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HSection5;
