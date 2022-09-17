import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Clock.css';

const START_COUNT = 30;
const DECREMENT_COUNT_SECOND = 1;
const DECREMENT_COUNT_MILISECONDS = 1000;

class Clock extends Component {
  state = {
    currentCount: START_COUNT,
  };

  componentDidMount() {
    this.intervalId = setInterval(this.timer, DECREMENT_COUNT_MILISECONDS);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer = () => {
    const { currentCount } = this.state;
    const { handleExpired, updateClock } = this.props;
    this.setState({
      currentCount: currentCount - DECREMENT_COUNT_SECOND,
    });
    if (currentCount <= DECREMENT_COUNT_SECOND) {
      clearInterval(this.intervalId);
    }
    if (currentCount === 1) {
      handleExpired();
    }
    updateClock(currentCount);
  };

  getReset = () => {
    this.setState({ currentCount: START_COUNT }, () => {
      this.intervalId = setInterval(this.timer, DECREMENT_COUNT_MILISECONDS);
    });
  };

  stopClock = () => {
    clearInterval(this.intervalId);
  };

  render() {
    const { currentCount } = this.state;
    const { isToStopClock, resetTime } = this.props;
    if (resetTime) {
      this.getReset();
    }
    if (isToStopClock) {
      this.stopClock();
    }
    return (
      <div className="clock-container">
        <FontAwesomeIcon className="clock-icon" icon={ faClock } />
        <span
          className="clock-timer"
          data-testid="timer-clock"
        >
          {`Tempo: ${currentCount}s`}
        </span>
      </div>
    );
  }
}

Clock.propTypes = {
  handleExpired: PropTypes.func,
  updateClock: PropTypes.func,
  isToStopClock: PropTypes.bool,
  resetTime: PropTypes.bool,
}.isRequired;

export default Clock;
