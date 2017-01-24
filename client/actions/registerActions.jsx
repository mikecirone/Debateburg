var axios = require('axios');

import * as actionTypes from 'actionTypes';

import {showError} from './errorActions';

export var requestRegister = () => {
  return {
    type: actionTypes.FETCH_REGISTER_REQUEST
  };
};

export var receiveRegisterSuccess = (authToken) => {
  return {
    type: actionTypes.FETCH_REGISTER_SUCCESS,
    authToken
  };
};

export var receiveRegisterFailure = () => {
  return {
    type: actionTypes.FETCH_REGISTER_FAILURE
  };
};

export var fetchRegister = (email, password) => {
  return (dispatch, getState) => {
    dispatch(requestRegister());

    return axios.post('http://localhost:3000/users', {
      email, password
    }).then( (res) => {
      dispatch(receiveRegisterSuccess(res.headers['x-auth']));
      // dispatch(receiveRegisterSuccess("something"));
    })
    .catch( (err) => {
      dispatch(receiveRegisterFailure());
      //needed for register reducer to set 'isFetching' back to false

      dispatch(showError('Oops, that email is already taken.'));
      //Only verification that should occur on server.
    });

  };
};
