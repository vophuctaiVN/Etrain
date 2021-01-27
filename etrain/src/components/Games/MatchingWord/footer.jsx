import React from "react";
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this._skip = this._skip.bind(this);    
    this._refresh = this._refresh.bind(this);
  }
  _skip() {
    clearInterval(window.interval);
    this.props.skipquestion();
  }
  _refresh() {
    this.props.onRefresh();
  }
  render() {
    var replayStyle;
    var showSkip;
    if (this.props.hideReplay == true) {
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
              <h3 id="message">{this.props.message}</h3>
            </div>

            <div className="d-flex justify-content-center">
              <button
                style={replayStyle}
                className="btn btn-default btn-sm pull-right btn-primary"
                onClick={this._refresh}
              >
                Play Again
              </button>
              <button
                style={showSkip}
                className="btn btn-default btn-sm pull-right btn-danger"
                onClick={this._skip}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Footer;
