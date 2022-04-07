import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { timerAction, countAction } from '../redux/actions/index';

class Timer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const ONE_SECOND = 1000;
    const tID = setInterval(() => {
      dispatch(timerAction({ timerID: tID }));
      this.displayTimer();
    }, ONE_SECOND);
  }

  displayTimer() {
    const { timerID } = this.props;
    const { dispatch, countdown } = this.props;
    if (countdown > 0) {
      dispatch(countAction(countdown - 1));
    }
    if (countdown === 1) {
      dispatch(timerAction(
        { show: true, timerActive: false, countdown: 30 },
      ));
      clearInterval(timerID);
    }
  }

  render() {
    const { countdown } = this.props;
    return (
      <h2>{ countdown }</h2>
    );
  }
}

Timer.propTypes = {
  timerID: propTypes.number.isRequired,
  dispatch: propTypes.func.isRequired,
  countdown: propTypes.number.isRequired,
};

const mapStateToProps = ({ timer }) => (timer);

export default connect(mapStateToProps)(Timer);
