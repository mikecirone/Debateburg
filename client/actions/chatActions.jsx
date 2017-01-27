import uuid from 'node-uuid';

import * as actionTypes from 'actionTypes';

export var receiveRawMessage = (message) => {
  return {
    type: actionTypes.RECEIVE_MESSAGE,
    message
  };
};

export var resetChatInput = () => {
  return {
    type: actionTypes.RESET_CHAT_INPUT
  };
};

//TODO: consider moving socket to a singleton accessed from this file,
//      would reduce clutter in params, but need to look at lifecycle
//      of socket when user leaves chatroom
export var submitChatInput = (text, socket) => {
  return (dispatch, getState) => {
    var msg = {
      id: `${Date.now()}${uuid.v4()}`,
      text,
      channelID: "debatehall1"
    };
    socket.emit('new message', msg);
    dispatch(resetChatInput());
  };
};

export var changeChatInput = (text) => {
  return {
    type: actionTypes.CHANGE_CHAT_INPUT,
    text
  };
};
