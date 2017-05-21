import moment from 'moment';
import React, {PropTypes} from 'react';
var {connect} = require('react-redux');
import { hashHistory } from 'react-router';

import {nextPhase, newRemainingTime} from 'debateActions';
import {PRO_SUMMARY, CON_SUMMARY, PRO_REBUTTAL, CON_REBUTTAL, DONE} from 'debateConstants';

var Countdown = React.createClass({

  getInitialState: function() {
    return {
      minutes: "0", seconds: "00"
    };
  },

  calculateAndGetState: function() {
    var duration = moment.duration(this.endMoment.diff(moment()));
    var seconds = duration.seconds().toString();
    if(seconds.length===1) seconds = "0" + seconds;
    var minutes = duration.minutes().toString();
    this.props.dispatch(newRemainingTime({minutes, seconds}));
    return {
      minutes, seconds
    };
  },

  componentDidMount: function() {
    setTimeout(()=> {
        this.doNext();
    }, 1);
    //NOTE: changing props with dispatch from within didMount
    //      makes for a lot of buginess with phase states
  },

  doNext: function() {
    const {phase, countdownTime} = this.props;
    if(phase===DONE)
      hashHistory.push('/pastDebates');
    this.start(countdownTime);
  },

  start: function(countdownTime) {
    this.endMoment = moment().add(countdownTime, 'seconds');
    this.setState(this.calculateAndGetState());
    this.countdownTimeCopy = countdownTime;
    this.intervalId = setInterval(() => {
        this.setState(this.calculateAndGetState());
        --this.countdownTimeCopy;
        if(this.countdownTimeCopy===0) {
          clearInterval(this.intervalId);
          this.props.dispatch(nextPhase());
          this.doNext();
        }
      }, 1000);
  },

  clear: function() {
    if(this.intervalId) {
      clearInterval(this.intervalId);
    }
    //stops setState warning from executing if leaving page while countdown is ticking
  },

  componentWillUnmount: function() {
    this.clear();
  },

  render: function() {
    const { minutes, seconds } = this.state;
    return (
      <div>
        <p>{minutes}:{seconds}</p>
      </div>
    );
  }

});

export default connect((state) => {
  return {
    phase: state.debate.phase,
    countdownTime: state.debate.countdownTime
  };
})(Countdown);
