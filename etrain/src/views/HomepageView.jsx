import React, { Component } from "react";
import HSection1 from "../components/Homepage/HSection1";
import HSection2 from "../components/Homepage/HSection2";
import HSection3 from "../components/Homepage/HSection3";
import HSection4 from "../components/Homepage/HSection4";
import HSection5 from "../components/Homepage/HSection5";
import HSection6 from "../components/Homepage/HSection6";

class HomepageView extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <HSection1 />
        <HSection2 />
        <HSection3 />
        <HSection4 />
        <HSection5 />
        <HSection6 />
      </>
    );
  }
}

export default HomepageView;
