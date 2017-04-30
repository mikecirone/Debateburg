import * as actionTypes from 'actionTypes';

function lobbyReducer(state = {users: []}, action) {
  switch(action.type) {
    case actionTypes.LOBBY_RECEIVE_USER:
      var newState = Object.assign({}, state);
      newState.users.push(action.user);
      return newState;
    default:
      return state;
  }
}

export default lobbyReducer;
