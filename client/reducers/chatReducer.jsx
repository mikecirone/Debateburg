import { combineReducers } from 'redux';

import * as actionTypes from 'actionTypes';

var messagesReducer = (state = [], action) => {
  switch(action.type) {
    case actionTypes.RECEIVE_MESSAGE:
      return [
          ...state,
          action.message
        ];
    default:
      return state;
  }
};

var msgMakerReducer = (state = {
  text: ''
}, action) => {
  switch(action.type) {
    case actionTypes.RESET_CHAT_INPUT:
      return {text: ''};
    case actionTypes.CHANGE_CHAT_INPUT:
      return {text: action.text};
    default:
      return state;
  }
};

//TODO: add back in active channel
var chatReducer = combineReducers({
  messages: messagesReducer,
  msgMaker: msgMakerReducer
});

export default chatReducer;
