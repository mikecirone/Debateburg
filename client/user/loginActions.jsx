var axios = require('axios');

import * as actionTypes from 'actionTypes';

var receiveLoginSuccess = (data) => {
  return {
    type: actionTypes.FETCH_LOGIN_SUCCESS,
    data: {
      authToken: data.authToken,
      email: data.email,
      username: data.username,
      _id: data._id
    }
  };
};

export var fetchLogin = (usernameOrEmail, password) => {
  return (dispatch, getState) => {

    return axios.post('/users/login', {
      usernameOrEmail, password
    }).then( (res) => {
      dispatch(receiveLoginSuccess({
        authToken: res.headers['x-auth'],
        email: res.data.email,
        username: res.data.username,
        _id: res.data._id
      }));
    });
  }
}
