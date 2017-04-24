import * as actionTypes from 'actionTypes';

function userReducer(state = {}, action) {
    switch(action.type) {
      case actionTypes.FETCH_REGISTER_SUCCESS:
      case actionTypes.FETCH_LOGIN_SUCCESS:
          return {
            authToken: action.data.authToken,
            email: action.data.email,
            username: action.data.username,
            _id: action.data._id
          };
      default:
        return state
    }
}

export default userReducer;
