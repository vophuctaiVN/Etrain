import React, { Component } from 'react';

class HSection1 extends Component {
  render() {
    return (
      <section className="member_counter">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="single_member_counter">
              <span className="counter">1024</span>
              <h4>All Teachers</h4>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single_member_counter">
              <span className="counter">960</span>
              <h4> All Students</h4>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single_member_counter">
              <span className="counter">1019</span>
              <h4>Online Students</h4>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single_member_counter">
              <span className="counter">819</span>
              <h4>Ofline Students</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  }
}

export default HSection1;