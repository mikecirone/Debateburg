var React = require('react');
var {connect} = require('react-redux');

var actions = require('actions');

var Login = React.createClass({
  handleLogin: function() {
    this.props.dispatch(actions.fetchLogin());
  },
  render: function() {
    var {templateData1, isFetching, url} = this.props;

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
      templateData1: state.templateData.templateData1,
      ...state.login
    };
  }
)(Login);
