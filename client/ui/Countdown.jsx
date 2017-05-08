import moment from 'moment';
import React, {PropTypes} from 'react';
var {connect} = require('react-redux');
import { hashHistory } from 'react-router';

import {nextPhase} from 'debateActions';
import {DONE, PRO_SUMMARY, CON_SUMMARY, PRO_REBUTTAL, CON_REBUTTAL} from 'debateConstants';

var Countdown = React.createClass({

  getInitialState: function() {
    return {
      minutes: "0", seconds: "00"
    };
  },

  calculateAndGetState: function() {
    var duration = moment.duration(this.endMoment.diff(moment()));
    console.log(this.endMoment);
    console.log(moment());
    var seconds = duration.seconds().toString();
    // console.log(seconds);
    if(seconds.length===1) seconds = "0" + seconds;
    return {
      minutes: duration.minutes().toString(),
      seconds
    };
  },

  componentDidMount: function() {
    this.doNext();
  },

  doNext: function() {
    const {dispatch, countdownTime, phase} = this.props;
    this.start(countdownTime);
    var thisRef = this;
    this.timeoutId = setTimeout(()=> {
      dispatch(nextPhase());
      if(phase===DONE)
        hashHistory.push('/pastDebates');
      thisRef.doNext();
    }, countdownTime * 1000);
  },

  start: function(countdownTime) {
    if(this.intervalId)
        clearInterval(this.intervalId);
        // console.log(countdownTime);
    this.endMoment = moment().add(countdownTime, 'seconds');
    this.setState(this.calculateAndGetState());
    this.intervalId = setInterval(() => {
        this.setState(this.calculateAndGetState());
      }, 1000);
  },

  // reset: function() {
  //   this.endMoment = moment().add(this.props.seconds, 'seconds');
  //   clearInterval(this.intervalId);
  //   this.start();
  // },

  componentWillUnmount: function() {
    if(this.intervalId) clearInterval(this.intervalId);
    //stops setState warning from executing if leaving page while countdown is ticking
    if(this.timeoutId) clearTimeout(this.timeoutId);
  },

  // componentDidUpdate: function(prevProps, prevState) {
  //   if( prevState.minutes === '0' && prevState.seconds === '00' ) {
  //     console.log('code that should occur on countdown done');
  //     clearInterval(this.intervalId);
  //   }
  // },

  // componentWillReceiveProps: function(nextProps) {
  //   if(nextProps.isReset===true) { //&& this.props.isReset===false
  //     this.reset();
  //   }
  // },

  render: function() {
    const { minutes, seconds } = this.state;
    return (
      <p>{minutes}:{seconds}</p>
    );
  }

});

export default connect((state) => {
  return {
    phase: state.debate.phase,
    countdownTime: state.debate.countdownTime
  };
})(Countdown);
