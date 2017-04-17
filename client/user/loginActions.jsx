var axios = require('axios');

import * as actionTypes from 'actionTypes';

var receiveLoginSuccess = (data) => {
  return {
    type: actionTypes.FETCH_LOGIN_SUCCESS,
    data: {
      authToken: data.authToken,
      email: data.email
    }
  };
};

export var fetchLogin = (email, password) => {
  return (dispatch, getState) => {

    return axios.post('/users/login', {
      email, password
    }).then( (res) => {
      dispatch(receiveLoginSuccess({
        authToken: res.headers['x-auth'],
        email: res.data.email
      }));
    });
  }
}