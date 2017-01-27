import { combineReducers } from 'redux';

import * as actionTypes from 'actionTypes';

var chatReducer = combineReducers({
  messages: messagesReducer,
  msgMaker: msgMakerReducer
});

var messagesReducer = (state = {
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

var msgMakerReducer = (state = {
  text: ''
}, action) => {
  switch(action.type) {
    case actionTypes.CHAT_INPUT_SUBMIT:
      return {text: ''};
    case actionTypes.CHAT_INPUT_CHANGE:
      return {text: action.text};
    default:
      return state;
  }
};

export default chatReducer;
