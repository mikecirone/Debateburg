import * as actionTypes from 'actionTypes';

export var setDebate = ({sides, user}) => {
  return {
    type: actionTypes.SET_DEBATE,
    data: { sides, user }
  };
};

export var nextPhase = () => {
  return {
    type: actionTypes.NEXT_PHASE
  }
}
