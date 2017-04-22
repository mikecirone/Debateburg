import * as actionTypes from 'actionTypes';

var activeChannelReducer = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.SET_ACTIVE_CHANNEL:
      return {
        id: action.data.id,
        name: action.data.name
      };
    default:
      return state;
  }
};

export default activeChannelReducer;
