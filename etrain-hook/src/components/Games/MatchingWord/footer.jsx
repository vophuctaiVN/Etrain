import React from "react";

function Footer(props) {
  const _skip = () => {
    clearInterval(window.interval);
    props.skipquestion();
  };

  const _refresh = () => {
    props.onRefresh();
  };

  var replayStyle;
  var showSkip;

  if (props.hideReplay == true) {
    replayStyle = {
      display: "none",
    };
    showSkip = {
      display: "block",
    };
  } else {
    replayStyle = {
      display: "block",
    };
    showSkip = {
      display: "none",
    };
  }

  return (
    <section className="container-fluid game-foooter">
      <div className="row">
        <div className="col-md-12 footer-bar clearfix">
          <div className="col-md-6 col-sm-6 col-xs-6">
            <h3 id="message">{props.message}</h3>
          </div>

          <div className="d-flex justify-content-center">
            <button
              style={replayStyle}
              className="btn btn-default btn-sm pull-right btn-primary"
              onClick={_refresh}
            >
              Play Again
            </button>
            <button
              style={showSkip}
              className="btn btn-default btn-sm pull-right btn-danger"
              onClick={_skip}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
