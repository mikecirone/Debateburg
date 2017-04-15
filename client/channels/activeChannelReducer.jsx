import * as actionTypes from 'actionTypes';

var activeChannelReducer = (state = '', action) => {
  switch(action.type) {
    case actionTypes.SET_ACTIVE_CHANNEL:
      return action.id;
    default:
      return state;
  }
};

export default activeChannelReducer;
