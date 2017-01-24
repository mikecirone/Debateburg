import Register, { renderTextInput } from 'Register'
import React from 'react'
// note: using require with React led to test impl error

// See README for discussion of chai, enzyme, and sinon
import chai, {expect} from 'chai'
//assertion library - way more dloads than expect

import { shallow } from 'enzyme'
//enzyme supposedly better alternative to FacebookReactTestUtils
import chaiEnzyme from 'chai-enzyme'

import sinon from 'sinon'
//does spies/stubs/mocks - has way more dloads than expect

chai.use(chaiEnzyme())

describe('Register', () => {

  let subject = null;
  let touched, error, invalid, isFetching, handleSubmit;
  beforeEach(() => {
    touched = false;
    error = null;
    invalid = false;
    isFetching = false;
    handleSubmit = fn => fn;
  });

  const buildSubject = () => {
    const props = {
      fields: {
        email: {
          value: '',
          touched,
          error,
          invalid
        },
        password: {
          value: '',
          touched,
          error,
          invalid
        }
      },
      isFetching,
      handleSubmit
    };
    return shallow(<Register {...props}/>);
  };

  it('should not complain when receiving its props', () => {
    subject = buildSubject();
  });

  it('should call handleSubmit when form is submitted', () => {
    handleSubmit = sinon.spy();   //important to not use var/let here
                                  //desire is to point existing handleSubmit at spy
    subject = buildSubject();
    const form = subject.find('form');
    form.simulate('submit');
    expect(handleSubmit.callCount).to.equal(1);
  });

  it("loading text element's classes should include invisible when isFetching is false", () => {

    subject = buildSubject();
    var res = subject.find('#loading-text').hasClass('invisible');
    expect(res).to.be.true;
  });

  it("loading text element's classes should NOT include invisible when isFetching is true", () => {
    isFetching = true;
    subject = buildSubject();
    var res = subject.find('#loading-text').hasClass('invisible');
    expect(res).to.be.false;
  });

  describe('renderTextInput', () => {
  	let subject;
  	describe("when in an error state", () => {
  		it("renders an error message for the input", () => {
  			const input = { name: 'email', value: '' };
  			const label = 'Email';
  			const meta = { touched: true, error: 'Enter a valid email' };
  			const element = renderTextInput({ input, label, meta, invalid: true });
  			subject = shallow(element);
  			const emailHelpBlock = subject.find('.text-help').first();
  			expect(emailHelpBlock).to.have.text().length.above(0);
  		});
  	});
  });
});
