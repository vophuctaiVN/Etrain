import React from "react";
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.getInitialState = this.getInitialState.bind(this);
        this.tick = this.tick.bind(this);
        
        this.state = this.getInitialState();
      }
      
  getInitialState() {   
    return {
      currentSecond: this.props.seconds,
    };
  }
  componentWillMount() {
    this.prepareComponentState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.prepareComponentState(nextProps);
  }
  prepareComponentState(props) {
    if (props.stop == false) {
      window.interval = setInterval(this.tick, 1000);
      this.setState({
        currentSecond: props.seconds,
      });
    } else {
      clearInterval(window.interval);
    }
  }

  tick() {
    if (this.state.currentSecond > 0) {
      this.setState({
        currentSecond: this.state.currentSecond - 1,
      });
    } else {
      clearInterval(window.interval);
      this.props.counterend();
      //console.log("change word and score");
    }
  }

  

  render() {
    return (
      <div className="right-text">
        <h2>Time: {this.state.currentSecond}</h2>
      </div>
    );
  }
}

export default Timer;
