import * as actionTypes from 'actionTypes';
import {registerDefault} from 'stateDefaults';

var registerReducer = (state = registerDefault, action) => {
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
