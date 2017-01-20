import * as actionEnums from 'actionEnums';

export var templateReducer = (state = {templateData1: 'foo'}, action) => {
  switch(action.type) {
    case actionEnums.SET_TEMPLATE_DATA:
      return {
        ...state,
        templateData1: action.templateData
      };
    default:
      return state;
  };
};

export var loginReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case actionEnums.START_LOGIN_FETCH:
      return {
        isFetching: true,
        url: undefined
      };
    case actionEnums.COMPLETE_LOGIN_FETCH:
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
};

export var registerReducer = (state = {
    isFetching: false,
    authToken: undefined,
    error: undefined
  }, action) => {
  switch (action.type) {
    case actionEnums.FETCH_REGISTER_REQUEST:
      return {
        isFetching: true,
        authToken: undefined
      };
    case actionEnums.FETCH_REGISTER_SUCCESS:
      return {
        isFetching: false,
        authToken: action.jsonRes
      };
    case actionEnums.FETCH_REGISTER_FAILURE:
      return {
        isFetching: false,
        error: action.jsonRes
      }
    default:
      return state;
  }
};
