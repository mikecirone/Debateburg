import * as actionTypes from 'actionTypes';

var loginReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN_FETCH:
      return {
        isFetching: true,
        url: undefined
      };
    case actionTypes.COMPLETE_LOGIN_FETCH:
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
};

export default loginReducer;
