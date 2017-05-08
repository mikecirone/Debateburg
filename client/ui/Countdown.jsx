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
    var seconds = duration.seconds().toString();
    if(seconds.length===1) seconds = "0" + seconds;
    return {
      minutes: duration.minutes().toString(),
      seconds
    };
  },

  componentDidMount: function() {
    this.cueDoNext();
  },

  // doNext: function() {
  //   const {dispatch, countdownTime, phase} = this.props;
  //   this.start(countdownTime);
  //   var thisRef = this;
  //   this.timeoutId = setTimeout(()=> {
  //     // console.log('foo');
  //     dispatch(nextPhase());
  //     if(phase===DONE)
  //       hashHistory.push('/pastDebates');
  //     thisRef.doNext();
  //   }, countdownTime * 1000);
  // },
  //
  // start: function(countdownTime) {
  //   if(this.intervalId)
  //       clearInterval(this.intervalId);
  //   this.endMoment = moment().add(countdownTime, 'seconds');
  //   this.setState(this.calculateAndGetState());
  //   this.intervalId = setInterval(() => {
  //       // console.log('bar');
  //       this.setState(this.calculateAndGetState());
  //     }, 1000);
  // },

  cueDoNext: function() {
    var thisRef = this;
    setTimeout(()=> {
      thisRef.doNext();
    }, 200);
  },

  doNext: function() {
    var {countdownTime, phase} = this.props;
    console.log("before dispatch: ", phase);
    this.props.dispatch(nextPhase());
    phase = this.props.phase;
    console.log("after dispatch: ", phase);
    if(phase===DONE)
      hashHistory.push('/pastDebates');
    this.start(countdownTime);
  },

  start: function(countdownTime) {
    this.endMoment = moment().add(countdownTime, 'seconds');
    this.setState(this.calculateAndGetState());
    this.countdownTimeCopy = countdownTime;
    this.intervalId = setInterval(() => {
        // console.log('bar');
        this.setState(this.calculateAndGetState());
        --this.countdownTimeCopy;
        if(this.countdownTimeCopy===0) {
          clearInterval(this.intervalId);
          this.doNext();
        }
      }, 1000);
  },

  componentWillReceiveProps: function(nextProps) {
    console.log(nextProps.phase);
  },

  beginStart: function() {
    this.doNext();
  },

  // reset: function() {
  //   this.endMoment = moment().add(this.props.seconds, 'seconds');
  //   clearInterval(this.intervalId);
  //   this.start();
  // },

  clear: function() {
    if(this.intervalId) {
      // console.log('shaka');
      clearInterval(this.intervalId);
    }
    //stops setState warning from executing if leaving page while countdown is ticking
    if(this.timeoutId) {
      // console.log('zulu');
      clearTimeout(this.timeoutId);
    }
  },

  componentWillUnmount: function() {
    this.clear();
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
      <div>
        <p>{minutes}:{seconds}</p>
        <button onClick={()=>this.cueDoNext()}>cue do next</button>
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
