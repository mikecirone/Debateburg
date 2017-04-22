import * as actionTypes from 'actionTypes';

function userReducer(state = {}, action) {
    return {
        authToken: ((state = "", action) => {
                    switch (action.type) {
                        case actionTypes.FETCH_REGISTER_SUCCESS:
                        case actionTypes.FETCH_LOGIN_SUCCESS:
                            return action.data.authToken;
                        default:
                            return state;
                    }
                  })(state.authToken, action),
        email: ((state = "", action) => {
                    switch (action.type) {
                        case actionTypes.FETCH_REGISTER_SUCCESS:
                        case actionTypes.FETCH_LOGIN_SUCCESS:
                            return action.data.email;
                        default:
                            return state;
                    }
                })(state.email, action),
        username: ((state = "", action) => {
                    switch (action.type) {
                        case actionTypes.FETCH_REGISTER_SUCCESS:
                        case actionTypes.FETCH_LOGIN_SUCCESS:
                            return action.data.username;
                        default:
                            return state;
                    }
                })(state.username, action),
        _id: ((state = "", action) => {
                  switch (action.type) {
                      case actionTypes.FETCH_REGISTER_SUCCESS:
                      case actionTypes.FETCH_LOGIN_SUCCESS:
                          return action.data._id;
                      default:
                          return state;
                  }
              })(state._id, action)
    }
}

export default userReducer;
