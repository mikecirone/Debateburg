import * as actionTypes from 'actionTypes';
import {PRO_SUMMARY, CON_SUMMARY, PRO_REBUTTAL, CON_REBUTTAL, DONE} from 'debateConstants';

var isUserProReducer = (state = false, action) => {
  switch(action.type) {
    case actionTypes.SET_DEBATE:
      const {user, sides} = action.data;
      return (user._id===sides.pro._id) ? true : false;
    default:
      return state;
  }
};

var phaseReducer = (state = PRO_SUMMARY, action) => {
  switch(action.type) {
    case actionTypes.SET_DEBATE:
      return PRO_SUMMARY;
    case actionTypes.NEXT_PHASE:
      switch(state) {
        case PRO_SUMMARY:
          return CON_SUMMARY;
        case CON_SUMMARY:
          return PRO_REBUTTAL;
        case PRO_REBUTTAL:
          return CON_REBUTTAL;
        case CON_REBUTTAL:
          return DONE;
        default:
          return DONE;
      }
    default:
      return state;
  }
};

var sidesReducer = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.SET_DEBATE:
      return {
        pro: action.data.sides.pro,
        con: action.data.sides.con
      }
    default:
      return state;
  }
};

var debateReducer = (state = {}, action) => {
  const lesserState = {
    isUserPro: isUserProReducer(state.isUserPro, action),
    phase: phaseReducer(state.phase, action),
    sides: sidesReducer(state.sides, action)
  };
  var isUserActive = (function(lesserState){
                          const isUserPro = lesserState.isUserPro;
                          switch(lesserState.phase) {
                            case PRO_SUMMARY:
                              return (isUserPro) ? true : false;
                            case CON_SUMMARY:
                              return (isUserPro) ? false : true;
                            case PRO_REBUTTAL:
                              return (isUserPro) ? true :  false;
                            case CON_REBUTTAL:
                              return (isUserPro) ? false : true;
                            default:
                              return false;
                          }
                        })(lesserState);
  var countdownTime = (function(lesserState){
                            const phase = lesserState.phase;
                            switch(phase) {
                              case PRO_SUMMARY:
                              case CON_SUMMARY:
                                return 20;
                              case PRO_REBUTTAL:
                              case CON_REBUTTAL:
                                return 10;
                              default:
                                  return 0;
                            }
                          })(lesserState);
  return Object.assign({}, lesserState, {isUserActive}, {countdownTime});
};

export default debateReducer;
