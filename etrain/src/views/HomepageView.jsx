import React, { Component } from 'react';
import HSection1 from '../components/Homepage/HSection1';
import HSection2 from '../components/Homepage/HSection2';
import HSection3 from '../components/Homepage/HSection3';
import HSection4 from '../components/Homepage/HSection4';
import HSection5 from '../components/Homepage/HSection5';
import HSection6 from '../components/Homepage/HSection6';
import HSection7 from '../components/Homepage/HSection7';
import HSection8 from '../components/Homepage/HSection8';

class HomepageView extends Component {
  render() {
    return (
      <>
        <HSection1 />
        <HSection2 />
        <HSection3 />
        {/* <HSection4 /> */}
        <HSection5 />
        <HSection6 />
        {/* <HSection7 /> */}
        <HSection8 />
      </>
    );
  }
}

export default HomepageView;