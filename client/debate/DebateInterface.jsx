var React = require('react');
var {connect} = require('react-redux');

import {PRO_SUMMARY, CON_SUMMARY, PRO_REBUTTAL, CON_REBUTTAL, DONE} from 'debateConstants';
import Countdown from 'Countdown';
import {nextPhase} from 'debateActions';
import { hashHistory } from 'react-router';

var DebateInterface = React.createClass({

  getPhaseStr: function(phase) {
    switch(phase) {
      case PRO_SUMMARY:
        return "Pro Summary";
      case CON_SUMMARY:
        return "Con Summary";
      case PRO_REBUTTAL:
        return "Pro Rebuttal";
      case CON_REBUTTAL:
        return "Con Rebuttal";
      default:
        return "Pro Summary";
    }
  },

  render: function() {
    const {phase, sides, countdownTime, dispatch} = this.props;
    // const {isReset} = this.state;
    return (
      <div>
        <h3>{this.getPhaseStr(phase)}</h3>
        <h4><strong>Pro:</strong> {sides.pro.username}</h4>
        <h4><strong>Con:</strong> {sides.con.username}</h4>
        <Countdown />
        {/* <button onClick={()=>this.do()}>Do</button> */}
      </div>
    );
  }
});

export default connect((state) => {
  return {
    phase: state.debate.phase,
    sides: state.debate.sides,
    countdownTime: state.debate.countdownTime
  };
})(DebateInterface);
