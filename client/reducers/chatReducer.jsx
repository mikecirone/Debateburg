import * as actionTypes from 'actionTypes';

var chatReducer = (state = {
  messages: [],
  activeChannel: ''
}, action) => {
  switch(action.type) {
    case actionTypes.RECEIVE_MESSAGE:
      return {
        messages: [
          ...state.messages,
          action.message
        ],
        activeChannel: "foo"
      };
    default:
      return state;
  }
};

export default chatReducer;
