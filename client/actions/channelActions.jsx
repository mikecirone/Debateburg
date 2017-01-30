import moment from 'moment';
var axios = require('axios');
import uuid from 'node-uuid';

import * as actionTypes from 'actionTypes';
import {showError} from './errorActions';

export var requestChannels = () => {
  return {
    type: actionTypes.FETCH_CHANNELS_REQUEST
  };
};

export var receiveChannelsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_CHANNELS_SUCCESS,
    data
  };
};

export var receiveChannelsFailure = () => {
  return {
    type: actionTypes.FETCH_CHANNELS_FAILURE
  };
};

export var fetchChannels = () => {
  return (dispatch, getState) => {
    dispatch(requestChannels());

    return axios.get('/channels')
    .then( (res) => {
      dispatch(receiveChannelsSuccess(res.data));
    })
    .catch( (err) => {
      dispatch(receiveChannelsFailure());
      dispatch(showError("Oops, the channels could not be loaded."));
    });

  };
};

export var receiveRawChannel = (channel) => {
  return {
    type: actionTypes.RECEIVE_CHANNEL,
    channel
  };
};

export var resetChannelInput = () => {
  return {
    type: actionTypes.RESET_CHANNELS_INPUT
  };
};

//TODO: consider moving socket to a singleton accessed from this file,
//      would reduce clutter in params, but need to look at lifecycle
//      of socket when user leaves chatroom
export var submitChannelInput = (name, socket) => {
  return (dispatch, getState) => {
    var msg = {
      name,
      createdAt: Date.now(),
      id: `${Date.now()}${uuid.v4()}`
    };
    socket.emit('new channel', msg);
    dispatch(resetChannelInput());

    //TODO: figure out why return is here
    //TODO: add error handling, maybe
    return axios.post('/channels', {...msg});
  };
};

export var changeChannelInput = (text) => {
  return {
    type: actionTypes.CHANGE_CHANNELS_INPUT,
    text
  };
};
