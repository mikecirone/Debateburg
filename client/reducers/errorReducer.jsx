import * as actionTypes from 'actionTypes';
import {errorDefault} from 'stateDefaults';

/*original data structure:
    isActive, message
  needed to change to play nice with redux-form  
*/

var errorReducer = (state = errorDefault, action) => {

  switch(action.type) {
    case actionTypes.SHOW_ERROR_MESSAGE:
      return {errorIsActive: true, errorMessage: action.error};

    case actionTypes.RESET_ERROR_MESSAGE:
      return {errorIsActive: false, errorMessage: undefined};

    default:
      return state;
  }

};

export default errorReducer;
