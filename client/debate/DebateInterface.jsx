var React = require('react');
var {connect} = require('react-redux');
import moment from 'moment';

import {PRO_SUMMARY, CON_SUMMARY, PRO_REBUTTAL, CON_REBUTTAL, DONE} from 'debateConstants';
import {PRO, CON} from 'constants';
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
    const {phase, sides, countdownTime, resolution,
           isUserActive, activeSide, dispatch} = this.props;
    const {minutes, seconds} = this.state;
    const remainingTimeStr = minutes + ":" + seconds;

    var proInterfaceClassStr = "interface pro ";
    if(activeSide===PRO) proInterfaceClassStr += "active";

    var conInterfaceClassStr = "interface con ";
    if(activeSide===CON) conInterfaceClassStr += "active";

    return (

      <div>
        <table className="resolution">
          <tbody>
            <tr>
              <td>
                <p>
                  <span><strong>Resolution:</strong></span>
                  {resolution}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="interface-container">
            <div className={proInterfaceClassStr}>
              <table>
                <tbody>
                  <tr>
                    <td className="side-and-user">
                      <h4>
                          PRO
                      </h4>
                      <hr />
                      <h5>
                        {sides.pro.username}
                      </h5>
                    </td>
                    <td>
                      <h3 className="countdown">
                        {activeSide===PRO ? remainingTimeStr : '0:00'}
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={conInterfaceClassStr}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h3 className="countdown">
                        {activeSide===CON ? remainingTimeStr : '0:00'}
                      </h3>
                    </td>
                    <td className="side-and-user">
                      <h4>
                          CON
                      </h4>
                      <hr />
                      <h5>
                        {sides.con.username}
                      </h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 className="phase">
              Phase: {this.getPhaseStr(phase)}
            </h4>
          </div>
      </div>

    );
  }
});

export default connect((state) => {
  return {
    phase: state.debate.phase,
    sides: state.debate.sides,
    countdownTime: state.debate.countdownTime,
    isUserActive: state.debate.isUserActive,
    activeSide: state.debate.activeSide
  };
})(DebateInterface);
