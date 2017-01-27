import * as actionTypes from 'actionTypes';

export var receiveRawMessage = () => (message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
};
