var axios = require('axios');

import * as actionTypes from 'actionTypes';
import {showError} from 'errorActions';

export var requestRegister = () => {
  return {
    type: actionTypes.FETCH_REGISTER_REQUEST
  };
};

export var receiveRegisterSuccess = (data) => {
  return {
    type: actionTypes.FETCH_REGISTER_SUCCESS,
    data: {
      authToken: data.authToken,
      email: data.email
    }
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

    return axios.post('/users', {
      email, password
    }).then( (res) => {
      dispatch(receiveRegisterSuccess({
        authToken: res.headers['x-auth'],
        email: res.data.email
      }));
    })
    .catch( (err) => {

      return new Promise((resolve, reject) => reject(err));

      // dispatch(receiveRegisterFailure());
      // //needed for register reducer to set 'isFetching' back to false
      //
      // dispatch(showError('Oops, that email is already taken.'));
      // //Only verification that should occur on server.
    });

  };
};
