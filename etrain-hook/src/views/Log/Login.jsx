import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  setCookiesValue,
  hashToSHA1,
  getCookiesValue,
  showAlert,
} from "../../utils/helpers";

function Login(props) {
  const [info, setInfo] = useState({ username: "", password: "" });

  useEffect(() => {
    window
      .AccountAPIsService_CheckAuth(getCookiesValue("authToken"))
      .then(() => props.history.push("hompage"));
    window.scrollTo(0, 0);
  }, []);

  const handleSignInClick = (event) => {
    event.preventDefault();
    const requestBody = {
      username: info.username,
      sha1Pass: hashToSHA1(info.password),
    };
    window
      .AccountAPIsService_Authenticate(requestBody)
      .then((result) => {
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
            <h2 className="form-title">Sign in</h2>
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
                  value={info.username}
                  onChange={(e) =>
                    setInfo({ ...info, username: e.target.value })
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
                  value={info.password}
                  onChange={(e) =>
                    setInfo({ ...info, password: e.target.value })
                  }
                />
              </div>

              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  defaultValue="Log in"
                  onClick={handleSignInClick}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
