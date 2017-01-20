var React = require('react');
var {connect} = require('react-redux');

var actions = require('actions');

var Login = React.createClass({
  handleLogin: function() {
    this.props.dispatch(actions.fetchRegister());
  },
  render: function() {
    var {isFetching, authToken} = this.props;

    function renderMsg() {
      if(isFetching) {
        return "Loading...";
      } else {
        return authToken;
      }
    }

    return (
      <div>
        <p>Register</p>
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
      ...state.register
    };
  }
)(Login);
