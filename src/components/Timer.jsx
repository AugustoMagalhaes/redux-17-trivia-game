import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 5,
      timerID: 0,
    };
  }

  componentDidMount() {
    const milliseconds = 1000;
    const timerID = setInterval(() => {
      this.displayTimer();
      this.setState({ timerID });
    }, milliseconds);
  }

  displayTimer() {
    const { seconds, timerID } = this.state;

    if (seconds > 1) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    } else {
      this.setState({ seconds: 5 });
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
