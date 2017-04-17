var axios = require('axios');

import * as actionTypes from 'actionTypes';

var receiveRegisterSuccess = (data) => {
    return {
        type: actionTypes.FETCH_REGISTER_SUCCESS,
        data: {
            authToken: data.authToken,
            email: data.email
        }
    };
};

export var fetchRegister = (email, password) => {
    return (dispatch, getState) => {

        return axios.post('/users', {
            email, password
        }).then( (res) => {
            dispatch(receiveRegisterSuccess({
                authToken: res.headers['x-auth'],
                email: res.data.email
            }));
        });
    }
}