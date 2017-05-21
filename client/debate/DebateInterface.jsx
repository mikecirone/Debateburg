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
    const {phase, sides, countdownTime,
           isUserActive, activeSide, dispatch} = this.props;
    const {minutes, seconds} = this.state;
    const remainingTimeStr = minutes + ":" + seconds;
    return (

      <div>
        <table className="resolution">
          <tbody>
            <tr>
              <td>
                <p>
                  <span><strong>Resolution:</strong></span>
                  Dogs are cooler than cats. Paul Atreides was bad
                  for galactic society and ...
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="interface-container">
          <tbody>
            <tr>
              <td className="interface-cell pro">
                <div className="interface active">
                  <h4 className="user-and-side">
                      {sides.pro.username} | PRO
                  </h4>
                  <h3 className="countdown">
                    {activeSide===PRO ? remainingTimeStr : '0:00'}
                  </h3>
                </div>
              </td>
              <td className="interface-cell con">
                <div className="interface">
                  <h3 className="countdown">
                    {activeSide===CON ? remainingTimeStr : '0:00'}
                  </h3>
                  <h4 className="user-and-side">
                      CON | {sides.con.username}
                    </h4>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="interface-container">
          <tr>
            <td class="interface-cell pro">
                <div class="interface active">
                  <table>
                    <tr>
                      <td>
                        <h4>
                            PRO Summary
                        </h4>
                        <hr />
                        <h5>RedKrovvy</h5>
                      </td>
                      <td>
                        <h3 className="countdown">
                          {activeSide===PRO ? remainingTimeStr : '0:00'}
                        </h3>
                      </td>
                    </tr>
                  </table>
                </div>
            </td>
            <td class="interface-cell con">
                <div class="interface active">
                  <table>
                    <tr>
                      <td>
                        <h3 className="countdown">
                          {activeSide===CON ? remainingTimeStr : '0:00'}
                        </h3>
                      </td>
                      <td>
                        <h4>
                            CON Summary
                        </h4>
                        <hr />
                        <h5>RedKrovvy</h5>
                      </td>
                    </tr>
                  </table>
                </div>
            </td>
          </tr>
        </table>
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
