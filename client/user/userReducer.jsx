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
      case actionTypes.FETCH_LOGOUT_SUCCESS:
          // note: not doing this because Lobby.jsx needs user id
          //       in its 'remove user' socket emit
          //       access page will carry over old user's data,
          //       so not secure yet, but will function as next login
          //       will wipe out this data
          // return {
          //   authToken: "",
          //   email: "",
          //   username: "",
          //   _id: ""
          // };
      default:
        return state
    }
}

export default userReducer;
