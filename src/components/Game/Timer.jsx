import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
      timerID: 0,
    };
  }

  componentDidMount() {
    const milliseconds = 1000;
    const timerID = setInterval(() => {
      this.displayTimer();
    }, milliseconds);
    this.setState({ timerID });
  }

  // componentWillUnmount() {
  //   clearInterval(this.state.timerID);
  //   console.log('limpou');
  // }

  displayTimer() {
    const { seconds, timerID } = this.state;
    console.log();
    if (seconds > 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    } if (seconds === 0) {
      this.setState({ seconds: 'TIME OUT' });
    } else {
      clearInterval(timerID);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <h2>{ seconds }</h2>
    );
  }
}

export default Timer;
