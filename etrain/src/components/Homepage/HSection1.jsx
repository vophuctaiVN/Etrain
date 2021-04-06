import React, { Component } from "react";
import { Link } from "react-router-dom";

class HSection1 extends Component {
  render() {
    return (
      <section className="banner_part">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-xl-6">
              <div className="banner_text">
                <div className="banner_text_iner">
                  <h5>Every child yearns to learn</h5>
                  <h1>Making Your Childs World Better</h1>
                  <p>
                    English has fast become the world’s most widely used and
                    commonly spoken language today and the need to learn English
                    for kids has increased exponentially with this growth
                  </p>
                  <Link to={`/grammar`} className="btn_1">
                    View Course
                  </Link>
                  <Link to={`/first-test`} className="btn_2">
                    Take Quizs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HSection1;
