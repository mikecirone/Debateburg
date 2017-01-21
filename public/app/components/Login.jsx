var React = require('react');
var {connect} = require('react-redux');

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var registerProps = {
  isFetching: true, authToken: undefined, onRegister: undefined, error: {isActive: false}
};

var Login = React.createClass({
  handleLogin: function() {
    this.props.dispatch(actions.fetchLogin());
  },
  render: function() {
    var {isFetching, url} = this.props;

    function renderMsg() {
      if(isFetching) {
        return "Loading...";
      } else {
        return url;
      }
    }

    return (
      <div>
        <p>Login</p>
        <p>{renderMsg()}</p>
        <button className="button" onClick={this.handleLogin}>
          Go
        </button>
      </div>
    );
  }
});

export default connect(
  (state) => {
    return {
      ...state.login
    };
  }
)(Login);
