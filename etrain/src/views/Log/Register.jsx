import React from "react";
import { Link } from "react-router-dom";
import { showAlert } from "../../utils/helpers";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }
  handleCreateClick(e) {
    e.preventDefault();
    const formData = {
      Username: document.getElementById("username").value,
      Password: document.getElementById("pass").value,
      Name: document.getElementById("name").value,
      Email: document.getElementById("email").value,
    };

    window
      .AccountAPIsService_Create(formData)
      .then((result) => {
        switch (result.statusCode) {
          case 400:
          case 404:
          case 500:
            showAlert(result.json.error.message, result.json.error.detail);
            break;
          case 200:
            showAlert(
              result.json.error.message,
              "Create new Account successfull"
            );
            //notify(result.json.error.message, 'Create new Account successfull', "success");
            window.location.href = "/login";
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <section className="signup">
        <div className="login_container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name" className="label-login">
                    <i className="zmdi zmdi-account material-icons-name" />
                  </label>
                  <input type="text" id="name" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="label-login">
                    <i className="zmdi zmdi-email" />
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Your Username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass" className="label-login">
                    <i className="zmdi zmdi-lock" />
                  </label>
                  <input type="password" id="pass" placeholder="Password" />
                </div>
                <div className="form-group">
                  <label htmlFor="re-pass" className="label-login">
                    <i className="zmdi zmdi-lock-outline" />
                  </label>
                  <input type="email" id="email" placeholder="Your Mail" />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="agree-term"
                  />
                  <label htmlFor="agree-term" className="label-agree-term">
                    <span>
                      <span />
                    </span>
                    I agree all statements in{" "}
                    <a href="#" className="term-service">
                      Terms of service
                    </a>
                  </label>
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    defaultValue="Register"
                    onClick={this.handleCreateClick}
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src="img/signup-image.jpg" alt="sing up image" />
              </figure>
              <Link to={`/login`} className="signup-image-link">
                I am already member
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
