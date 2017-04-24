import moment from 'moment';
import React, {PropTypes} from 'react';

export default React.createClass({

  propTypes: {
    seconds: PropTypes.number.isRequired,
    start: PropTypes.bool
  },

  defaultProps: {
    start: true
  },

  getInitialState: function() {
    this.endMoment = moment().add(this.props.seconds, 'seconds');
    return this.calculateAndGetState();
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
    if(this.props.start===true) {
      this.intervalId = setInterval(() => {
        this.setState(this.calculateAndGetState());
      }, 1000);
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if( prevState.minutes === '0' && prevState.seconds === '00' ) {
      clearInterval(this.intervalId);
      //TODO: plug in handleCompletedCountdown()
    }
  },

  render: function() {
    const { minutes, seconds } = this.state;
    return (
      <p>{minutes}:{seconds}</p>
    );
  }

});
