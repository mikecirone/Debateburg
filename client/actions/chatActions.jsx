import moment from 'moment';
var axios = require('axios');

import * as actionTypes from 'actionTypes';
import {showError} from './errorActions';

export var requestMessages = () => {
  return {
    type: actionTypes.FETCH_MESSAGES_REQUEST
  };
};

export var receiveMessagesSuccess = (data) => {
  return {
    type: actionTypes.FETCH_MESSAGES_SUCCESS,
    data
  };
};

export var receiveMessagesFailure = () => {
  return {
    type: actionTypes.FETCH_MESSAGES_FAILURE
  };
};

export var fetchMessages = () => {
  return (dispatch, getState) => {
    dispatch(requestMessages());

    return axios.get('/messages')
    .then( (res) => {
      dispatch(receiveMessagesSuccess(res.data));
    })
    .catch( (err) => {
      dispatch(receiveMessagesFailure());
      dispatch(showError("Oops, the chat's messages could not be loaded."));
    });

  };
};

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
      text,
      channelID: "debatehall1",
      user: 'mike',
      time: moment.utc().format('lll')
    };
    socket.emit('new message', msg);
    dispatch(resetChatInput());

    //TODO: figure out why return is here
    //TODO: add error handling, maybe
    return axios.post('/messages', {...msg});
  };
};

export var changeChatInput = (text) => {
  return {
    type: actionTypes.CHANGE_CHAT_INPUT,
    text
  };
};
