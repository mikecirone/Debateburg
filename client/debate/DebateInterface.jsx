var React = require('react');
var {connect} = require('react-redux');

import {DONE, PRO_SUMMARY, PRO_SUMMARY2, CON_SUMMARY, PRO_REBUTTAL, CON_REBUTTAL} from 'debateConstants';
import Countdown from 'Countdown';
import {nextPhase} from 'debateActions';
import { hashHistory } from 'react-router';

var DebateInterface = React.createClass({

  getPhaseStr: function(phase) {
    switch(phase) {
      case PRO_SUMMARY:
        return "Pro Summary";
      case PRO_SUMMARY2:
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

  // getInitialState: function() {
  //   return { isReset: false };
  // },

  // componentDidMount: function() {
  //   this.doNext();
  // },
  //
  // componentWillUnmount: function() {
  //   clearTimeout(this.timeoutId);
  // },
  //
  // doNext: function() {
  //   const {dispatch, countdownTime, phase} = this.props;
  //   var thisRef = this;
  //   this.timeoutId = setTimeout(()=> {
  //     dispatch(nextPhase());
  //     if(phase===DONE)
  //       hashHistory.push('/pastDebates');
  //     this.setState({isReset: true});
  //     setTimeout(()=>{
  //       thisRef.doNext();
  //     }, countdownTime * 1000);
  //   }, countdownTime * 1000);
  // },
  //
  // componentDidUpdate: function(prevProps, prevState) {
  //   if(this.state.isReset===true)
  //     this.setState({isReset: false});
  // },
  //
  // do: function() {
  //   const {dispatch} = this.props;
  //   dispatch(nextPhase());
  // },

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
