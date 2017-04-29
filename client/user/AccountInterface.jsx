var React = require('react');
var {connect} = require('react-redux');

import connectSubmitForm from 'connectSubmitForm';
import {fetchLogout} from 'logoutActions';
import {redirectSubmitted} from 'redirect';

var AccountInterface = React.createClass({

  onLogout: function(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.username);
  },

  render: function() {
    const { props: { children, username, isLoading } } = this;
    return (
      <div>
        <form onSubmit={this.onLogout} className="account-interface-container">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            Log Out
          </button>
          <p>{username}</p>
        </form>
        <hr className="clear" />
        <div>
            {children}
        </div>
      </div>
    );
  }
});

var ReduxedAccountInterface = connect((state) => {
    return {
        username: state.user.username
    };
})(AccountInterface);

var RedirectAccountInterface = redirectSubmitted('/login')(ReduxedAccountInterface);

export default connectSubmitForm(RedirectAccountInterface, fetchLogout, "Oops, could not log you out.");
