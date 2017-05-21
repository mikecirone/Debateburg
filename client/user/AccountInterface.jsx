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

      <div className="account-interface-react">
        <table className="account-interface">
          <tbody>
            <tr>
              <td>
                <form onSubmit={this.onLogout}>
                    <p className="small">{username}</p>
                    <button type="submit" className="btn small" disabled={isLoading}>
                      Log Out
                    </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="title-bar">
          <tbody>
            <tr>
              <td>
                <h5>Debateburg</h5>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="nav-bar small">
          <tbody>
            <tr>
              <td>
                <a href="#">Lobby</a>
                <span> | </span>
                <a href="#">Current Debate</a>
                <span> | </span>
                <a href="#">Debate Archive</a>
                <hr />
              </td>
            </tr>
          </tbody>
        </table>
        {children}
      </div>

    );
  }
});

export default connect((state) => {
    return {
        user: state.user
    };
})(AccountInterface);
