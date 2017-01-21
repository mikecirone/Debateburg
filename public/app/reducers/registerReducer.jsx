import * as actionTypes from 'actionTypes';

var registerReducer = (state = {
    isFetching: false,
    authToken: undefined
  }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REGISTER_REQUEST:
      return {
        isFetching: true,
        authToken: undefined
      };
    case actionTypes.FETCH_REGISTER_SUCCESS:
      return {
        isFetching: false,
        authToken: action.jsonRes
      };
    case actionTypes.FETCH_REGISTER_FAILURE:
      return {
        isFetching: false
      }
    default:
      return state;
  }
};

export default registerReducer;
