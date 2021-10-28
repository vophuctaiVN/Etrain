import React, { Component } from "react";

function Footer() {
  return (
    <footer className="footer-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-sm-6 col-md-4 col-xl-3">
            <div className="single-footer-widget footer_1">
              <a href="index.html">
                {" "}
                <img src="img/logo.png" alt="" />{" "}
              </a>
              <p>
                We are currently working collaboratively and will continue in
                this direction with multiple units on campus to provide the best
                student support possible.
              </p>
              <p>This is a non-commercial project</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-xl-4">
            <div className="single-footer-widget footer_2">
              <h4>Newsletter</h4>
              <p>
                Our mission is to help people have an impact within the
                community they are part of.
              </p>
              <form action="#">
                <div className="form-group">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter email address"
                    />
                    <div className="input-group-append">
                      <button className="btn btn_1" type="button">
                        <i className="ti-angle-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="social_icon">
                <a href="# ">
                  {" "}
                  <i className="ti-facebook" />{" "}
                </a>
                <a href="# ">
                  {" "}
                  <i className="ti-twitter-alt" />{" "}
                </a>
                <a href="# ">
                  {" "}
                  <i className="ti-instagram" />{" "}
                </a>
                <a href="# ">
                  {" "}
                  <i className="ti-skype" />{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-md-4">
            <div className="single-footer-widget footer_2">
              <h4>Contact us</h4>
              <div className="contact_info">
                <p>
                  <span> Address :</span> Song Hành, khu phố 6, Thủ Đức, Thành
                  phố Hồ Chí Minh
                </p>
                <p>
                  <span> Phone :</span> +84 773651157
                </p>
                <p>
                  <span> Email : </span>vophuctai2411@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="copyright_part_text text-center">
              <div className="row">
                <div className="col-lg-12">
                  <p className="footer-text m-0">
                    Copyright ©2021 All rights reserved | This website is made
                    by{" "}
                    <a href="" target="_blank" rel="noopener noreferrer">
                      Vo Phuc Tai
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
