var React = require('react');
var {connect} = require('react-redux');
import { hashHistory } from 'react-router';

import {logout} from 'logoutActions';

var AccountInterface = React.createClass({

  onLogout: function(event) {
    event.preventDefault();
    this.props.dispatch(logout());
    hashHistory.push('/');
  },

  render: function() {
    const { props: { children,  user:{username}, isLoading } } = this;
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

export default connect((state) => {
    return {
        user: state.user
    };
})(AccountInterface);
