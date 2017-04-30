import * as actionTypes from 'actionTypes';

export function receiveNewUser(user) {
  return {
    type: actionTypes.LOBBY_RECEIVE_USER,
    user
  }
}
