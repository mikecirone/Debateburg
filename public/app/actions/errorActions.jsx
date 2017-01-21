import * as actionTypes from 'actionTypes';

export var showError = (error) => {
  return {
    type: actionTypes.SHOW_ERROR_MESSAGE,
    error
  };
}

export var closeErrorModal = () => {
  return {
    type: actionTypes.RESET_ERROR_MESSAGE
  };
};
