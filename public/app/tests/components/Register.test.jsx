var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import Register from 'Register';

import * as seed from 'seed';

describe('Register', () => {
  it('should exist', () => {
    expect(Register).toExist();
  });

  it('should have loading paragraph without "invisible" class when isFetching is true', () => {
    var registerProps = {
      ...seed.registerProps,
      isFetching: true
    };
    var register = TestUtils.renderIntoDocument(<Register {...registerProps} />);
    var $el = $(ReactDOM.findDOMNode(register));

    var classList = $el.find('#loading-text').attr('class').split(/\s+/);
    expect(classList).toNotInclude('invisible');
  });

  it('should have loading paragraph with "invisible" class when isFetching is false', () => {

    var register = TestUtils.renderIntoDocument(<Register {...seed.registerProps} />);
    var $el = $(ReactDOM.findDOMNode(register));

    var classList = $el.find('#loading-text').attr('class').split(/\s+/);
    expect(classList).toInclude('invisible');
  });
});
