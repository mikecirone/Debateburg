import { combineReducers } from 'redux';

import * as actionTypes from 'actionTypes';

//TODO: add back in active channel
var chatReducer = combineReducers({
  messages: messagesReducer,
  msgMaker: msgMakerReducer
});

function messagesReducer(state = [], action) {
  switch(action.type) {
    // case actionTypes.RECEIVE_MESSAGE:
    case actionTypes[type + actionTypeTemplates.RECEIVE_MESSAGE]:
      return [
          ...state,
          action.message
        ];
    case actionTypes.FETCH_MESSAGES_SUCCESS:
      return [...action.data.messages];
    default:
      return state;
  }
}

function msgMakerReducer(state = {
  text: ''
}, action) {
  switch(action.type) {
    case actionTypes.RESET_CHAT_INPUT:
      return {text: ''};
    case actionTypes.CHANGE_CHAT_INPUT:
      return {text: action.text};
    default:
      return state;
  }
}

export default chatReducer;
