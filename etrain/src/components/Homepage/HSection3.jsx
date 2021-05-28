import React, { Component } from "react";
import { Link } from "react-router-dom";

class HSection3 extends Component {
  render() {
    return (
      <section className="learning_part">
        <div className="container">
          <div className="row align-items-sm-center align-items-lg-stretch">
            <div className="col-md-7 col-lg-7">
              <div className="learning_img">
                <img src="img/learning_img.png" alt="" />
              </div>
            </div>
            <div className="col-md-5 col-lg-5">
              <div className="learning_member_text">
                <h5>About us</h5>
                <h2>Learning with Love and Laughter</h2>
                <p>
                  Language acquisition also benefits a person by creating a
                  greater comprehension for how language works and is used. The
                  study found individuals with multilingual communication were
                  able to better read and interpret social situations, which
                  improved their performance in social settings.
                </p>
                <ul>
                  <li>
                    <span className="ti-pencil-alt" />
                    We have a lot of lessons for you to study from A1 to B2
                    level.
                  </li>
                  <li>
                    <span className="ti-ruler-pencil" />
                    We suggest lesson for you better if you have an account.
                  </li>
                </ul>
                <Link to={`/register`} className="btn_1">
                  New account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default HSection3;
