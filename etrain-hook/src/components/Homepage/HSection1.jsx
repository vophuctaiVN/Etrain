import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "reactstrap";
import { getCookiesValue } from "../../utils/helpers";

const HSection1 = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const [isLogin, setisLogin] = useState(false);

  window
    .AccountAPIsService_CheckAuth(getCookiesValue("authToken"))
    .then(() => setisLogin(true))
    .catch(() => setisLogin(false));

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
                <p></p>
                <Link to={`/grammar`} className="btn_1">
                  View Course
                </Link>
                {isLogin ? (
                  <Link to={`/first-test`} className="btn_2">
                    Take Quizs
                  </Link>
                ) : (
                  <>
                    <Link to={`/login`} className="btn_2" id="TooltipExample">
                      login
                    </Link>
                    <Tooltip
                      placement="right"
                      isOpen={tooltipOpen}
                      target="TooltipExample"
                      toggle={toggle}
                    >
                      Login to check your English level and enjoy more services
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HSection1;
