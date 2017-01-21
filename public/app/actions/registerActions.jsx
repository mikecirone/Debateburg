var axios = require('axios');

import * as actionTypes from 'actionTypes';

import {showError} from './errorActions';

export var requestRegister = () => {
  return {
    type: actionTypes.FETCH_REGISTER_REQUEST
  };
};

export var receiveRegisterSuccess = (jsonRes) => {
  return {
    type: actionTypes.FETCH_REGISTER_SUCCESS,
    jsonRes
  };
};

export var receiveRegisterFailure = (jsonRes) => {
  return {
    type: actionTypes.FETCH_REGISTER_FAILURE,
    jsonRes
  };
};

export var fetchRegister = () => {
  return (dispatch, getState) => {
    dispatch(requestRegister());

    axios.post('http://localhost:3000/users', {
      email: 'mikjejjkkssddff@1233.com',
      password: '123456'
    }).then( (res) => {
      dispatch(receiveRegisterSuccess(JSON.stringify(res)));
    })
    .catch( (err) => {
      dispatch(receiveRegisterFailure(JSON.stringify(err)));
      //needed for register reducer to set 'isFetching' back to false

      dispatch(showError('Oops, that username is already taken.'));
    });

  };
};
