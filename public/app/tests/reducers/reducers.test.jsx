var expect = require('expect');
var df = require('deep-freeze-strict');

import * as actionTypes from 'actionTypes';

import registerReducer from 'registerReducer';

describe('Reducers', () => {

  describe('registerReducer', () => {
    it('should set isFetching to true with FETCH_REGISTER_REQUEST action', () => {
      var action = {
        type: actionTypes.FETCH_REGISTER_REQUEST
      };
      var res = registerReducer(
        df({isFetching: false}),
        df(action));
      /* deep-freeze-strict makes sure that the reducers stay pure functions
         and do not alter the state or action parameters
      */
      expect(res.isFetching).toBe(true);
    });
  });

});
