import React from "react";
import { Link } from "react-router-dom";
import {
  setCookiesValue,
  hashToSHA1,
  getCookiesValue,
  showAlert,
} from "../../utils/helpers";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    window
      .AccountAPIsService_CheckAuth(getCookiesValue("authToken"))
      .then(() => this.props.history.push("hompage"));
  }

  handleSignInClick = (event) => {
    event.preventDefault();
    const requestBody = {
      username: this.state.username,
      sha1Pass: hashToSHA1(this.state.password),
    };
    window
      .AccountAPIsService_Authenticate(requestBody)
      .then((result) => {
        console.log(result);
        switch (result.statusCode) {
          case 401:
          case 404:
          case 500:
            showAlert(result.json.error.message, result.json.error.detail);
            break;
          case 200:
            setCookiesValue("authToken", result.json.result.token);
            setCookiesValue("userID", result.json.result.id);
            showAlert(result.json.error.message, "Login successfull");
            window.location.href = "/hompage";
            window.location.reload();
            break;
          default:
            break;
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <section className="sign-in">
        <div className="login_container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src="img/signin-image.jpg" alt="sing up image" />
              </figure>
              <Link to={`/register`} className="signup-image-link">
                {" "}
                Create an account{" "}
              </Link>
            </div>
            <div className="signin-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="login-form">
                <div className="form-group">
                  <label htmlFor="your_name" className="label-login">
                    <i className="zmdi zmdi-account material-icons-name" />
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Name"
                    value={this.state.username}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="your_pass" className="label-login">
                    <i className="zmdi zmdi-lock" />
                  </label>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="agree-term"
                  />
                  <label htmlFor="remember-me" className="label-agree-term">
                    <span>
                      <span />
                    </span>
                    Remember me
                  </label>
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    defaultValue="Log in"
                    //                    disabled={!validateInput(this.state.username, this.state.password)}
                    onClick={this.handleSignInClick}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
