import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { connect } from "react-redux";

import {
  setCookiesValue,
  getCookiesValue,
  USER_IMAGE_DOMAIN,
} from "../utils/helpers";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Nav,
  Media,
} from "reactstrap";
class TopBar extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isTop: true,
    userInfo: {},
  };

  componentDidMount() {
    document.addEventListener("scroll", () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop });
      }
    });
    window
      .AccountAPIsService_CheckAuth(getCookiesValue("authToken"))
      .then(() => this.setState({ isLogin: true }))
      .catch(() => this.setState({ isLogin: false }));

    // load image
    const queryObj = {
      userid: getCookiesValue("userID"),
    };
    window
      .UserInfo_Query(queryObj)
      .then((result) =>
        this.setState({
          userInfo: result.json.result.items[0],
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    const userInfo = this.state.userInfo;

    const handleSignOutClick = () => {
      setCookiesValue("authToken");
      window.location.href = "/hompage";
    };
    let loginIcon;
    let QAnav;
    if (this.state.isLogin) {
      loginIcon = (
        <>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={`${USER_IMAGE_DOMAIN}/${userInfo.image}`}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {userInfo.name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <Link to={`/profile`} className="nav-link">
                    My profile
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={(e) => e.preventDefault()}>
                  <span className="nav-link" onClick={handleSignOutClick}>
                    Logout
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </>
      );
      QAnav = (
        <li className="nav-item">
          <Link to={`/forum`} className="nav-link">
            {" "}
            Q/A{" "}
          </Link>
        </li>
      );
    } else {
      loginIcon = (
        <li className="nav-item">
          <Link to={`/login`} className="nav-link">
            {" "}
            Login{" "}
          </Link>
        </li>
      );
    }

    let iconStore;
    if (
      window.location.pathname === "/menu" ||
      window.location.pathname === "/cart" ||
      window.location.pathname === "/checkout" ||
      window.location.pathname.includes("/product-")
    )
      iconStore = (
        <Link to="/cart" className="nav-link">
          <IoMdCart
            size={20}
            style={{ float: "right", margin: "10px" }}
            onClick={this.ToggleGram}
          />

          <span className="bag d-flex justify-content-center align-items-center">
            <small>{this.props.cart.cartDetails.length}</small>
          </span>
        </Link>
      );
    else
      iconStore = (
        <li className="nav-item d-lg-block">
          <Link to={`/menu`} className="btn_1">
            Get a book
          </Link>
        </li>
      );
    return (
      <header
        className={
          this.state.isTop
            ? "main_menu home_menu"
            : "main_menu home_menu menu_fixed animated fadeInDown"
        }
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <Link to={`/homepage`} className="navbar-brand">
                  <img src="img/logo.png" alt="logo" />{" "}
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse main-menu-item justify-content-end"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav align-items-center">
                    {this.state.isLogin ? (
                      <li className="nav-item active">
                        <Link to={`/journey`} className="nav-link">
                          My journey
                        </Link>
                      </li>
                    ) : null}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Lessons
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <Link to={`/grammar`} className="dropdown-item">
                          {" "}
                          Grammar{" "}
                        </Link>
                        <Link to={`/vocabulary`} className="dropdown-item">
                          {" "}
                          Vocabulary{" "}
                        </Link>
                        <Link to={`/quizs`} className="dropdown-item">
                          {" "}
                          Quiz{" "}
                        </Link>
                      </div>
                    </li>
                    <li className="nav-item">
                      <Link to={`/dictionary`} className="nav-link">
                        {" "}
                        Dictionary{" "}
                      </Link>
                    </li>
                    {QAnav}
                    {loginIcon}
                    {iconStore}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, null)(TopBar);
