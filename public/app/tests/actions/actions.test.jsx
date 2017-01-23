import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import {expect} from 'chai'

import * as actionTypes from 'actionTypes'
import * as actions from 'registerActions'


const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_REGISTER_SUCCESS and has authToken payload when fetching todos has been done', () => {
    nock('http://localhost:3000/')
      .post('/users')
      .reply(200, 'content!', { "x-auth": "something" })

    const expectedActions = [
      { type: actionTypes.FETCH_REGISTER_REQUEST },
      { type: actionTypes.FETCH_REGISTER_SUCCESS, authToken: "something" }
    ]
    const store = mockStore({})

    return store.dispatch(actions.fetchRegister())
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expectedActions)
                                    //comparing arrays, so we want to compare what array refs
                                    //point to, which is the array data
                                    //  -done using to.deep.equal
      })
  })
})
