//using setup from:
//https://github.com/tylercollier/redux-form-test

import RegisterContainer from 'RegisterContainer'
import React from 'react'

import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'

import { reducer as formReducer } from 'redux-form'
import registerReducer from 'registerReducer';
import errorReducer from 'errorReducer';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import jsdom from 'jsdom'
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

describe('RegisterContainer', () => {
  let store;
  let subject;
  beforeEach(() => {
    store = createStore(combineReducers({
      register: registerReducer,
      error: errorReducer,
      form: formReducer
    }));
    subject = mount(
      <Provider store={store}>
        <RegisterContainer />
      </Provider>
    );
  });

  describe('Email', () => {
    let input;
    let emailHelpBlock;
    beforeEach(()=> {
      input = subject.find('input[name="email"]');
      emailHelpBlock = subject.find('#email-text-help');
    });

    it('does not show help text in default state', () => {
      expect(emailHelpBlock.text().length).to.equal(0);
    });

    it('shows help text when email is set blank', () => {
      input.simulate('blur');
      expect(emailHelpBlock.text().length).to.be.above(0);
    });

    it('shows help text when email is invalid and user blurs input', () => {
      input.simulate('change', {target: { value: 'sometext'}} );
      input.simulate('blur');
      expect(emailHelpBlock.text().length).to.be.above(0);
    });
  });

  describe('Password', () => {
    let input;
    let passwordHelpBlock;
    beforeEach(()=> {
      input = subject.find('input[name="password"]');
      passwordHelpBlock = subject.find('#password-text-help');
    });

    it('does not show help text in default state', () => {
      expect(passwordHelpBlock.text().length).to.equal(0);
    });

    it('shows help text when password lt 8 chars and user blurs input', () => {
      input.simulate('change', { target: { value: '1234567'}});
      input.simulate('blur');
      expect(passwordHelpBlock.text().length).to.be.above(0);
    });

    it('shows help text when password gte 8 chars,' +
       'but has non-alphanumeric char, and user blurs input', () => {
      input.simulate('change', { target: { value: '12345678%'}});
      input.simulate('blur');
      expect(passwordHelpBlock.text().length).to.be.above(0);
    });
  });
});
