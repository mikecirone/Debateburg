import * as actionTypes from 'actionTypes';

export var receiveRawMessage = (message) => {
  return {
    type: actionTypes.RECEIVE_MESSAGE,
    message
  };
};
