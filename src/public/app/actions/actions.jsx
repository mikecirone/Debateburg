// require('actionEnums');

import * as actionEnums from 'actionEnums';

var axios = require('axios');

export var setTemplateData = (templateData) => {
  return {
    type: actionEnums.SET_TEMPLATE_DATA,
    templateData
  };
};

export var startLoginFetch = () => {
  return {
    type: actionEnums.START_LOGIN_FETCH
  };
};

export var completeLoginFetch = (jsonRes) => {
  return {
    type: actionEnums.COMPLETE_LOGIN_FETCH,
    jsonRes
  };
};

export var fetchLogin = () => {
  return (dispatch, getState) => {
    dispatch(startLoginFetch());

    axios.post('http://localhost:3000/users/login', {
      email: 'mike@123.com',
      password: '123456'
    }).then(function(res) {
      dispatch(completeLoginFetch('foo'));
    });
  };
};

export var requestRegister = () => {
  return {
    type: actionEnums.FETCH_REGISTER_REQUEST
  };
};

export var receiveRegisterSuccess = (jsonRes) => {
  return {
    type: actionEnums.FETCH_REGISTER_SUCCESS,
    jsonRes
  };
};

export var receiveRegisterFailure = (jsonRes) => {
  return {
    type: actionEnums.FETCH_REGISTER_FAILURE,
    jsonRes
  };
};

export var fetchRegister = () => {
  return (dispatch, getState) => {
    dispatch(requestRegister());

    axios.post('http://localhost:3000/users', {
      email: 'mikjejjkkddff@1233.com',
      password: '123456'
    }).then( (res) => {
      dispatch(receiveRegisterSuccess(JSON.stringify(res)));
    })
    .catch( (err) => {
      dispatch(receiveRegisterFailure(JSON.stringify(err)));
    });

  };
};
