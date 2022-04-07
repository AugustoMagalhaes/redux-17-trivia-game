import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { timerAction } from '../redux/actions/index';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
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
    const { dispatch, resetTimer } = this.props;
    if (resetTimer) {
      this.setState({ seconds: 31 },
        () => dispatch(timerAction({ timerActive: true, resetTimer: false })));
    }
    if (seconds > 1) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    } else {
      this.setState({ seconds: 30 },
        () => dispatch(timerAction(
          { resetTimer: true, show: true, timerActive: false },
        )));
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

Timer.propTypes = {
  dispatch: propTypes.func.isRequired,
  resetTimer: propTypes.bool.isRequired,
};

const mapStateToProps = ({ timer }) => (timer);

export default connect(mapStateToProps)(Timer);
