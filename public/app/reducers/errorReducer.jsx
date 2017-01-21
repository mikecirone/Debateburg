import * as actionTypes from 'actionTypes';

var errorReducer = (state = {isActive: false, message: undefined}, action) => {

  switch(action.type) {
    case actionTypes.SHOW_ERROR_MESSAGE:
      return {isActive: true, message: action.error};

    case actionTypes.RESET_ERROR_MESSAGE:
      return {isActive: false, message: undefined};

    default:
      return state;
  }

};

export default errorReducer;
