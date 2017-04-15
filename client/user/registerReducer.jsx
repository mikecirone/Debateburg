import * as actionTypes from 'actionTypes';
import {registerDefault} from 'stateDefaults';

var registerReducer = (state = registerDefault, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REGISTER_REQUEST:
      return {
        isFetching: true
      };
    case actionTypes.FETCH_REGISTER_SUCCESS:
      return {
        isFetching: false
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
