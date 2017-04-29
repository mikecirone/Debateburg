var axios = require('axios');

import * as actionTypes from 'actionTypes';

var receiveLogoutSuccess = () => {
    return {
        type: actionTypes.FETCH_LOGOUT_SUCCESS
    };
};

export var fetchLogout = (username) => {
    return (dispatch, getState) => {

        return axios.post('/users/logout', { username })
        .then( (res) => {
            dispatch(receiveLogoutSuccess());
        });
    }
}
