var React = require('react');
var {connect} = require('react-redux');
import { hashHistory } from 'react-router';
var {Link} = require('react-router');

import {logout} from 'logoutActions';
import Login from 'Login';
import Register from 'Register';

var AccountInterface = React.createClass({

  getInitialState: function() {
    return {
      isRegistering: false,
      isLoggingIn: false
    };
  },

  onLogout: function(event) {
    event.preventDefault();
    this.props.dispatch(logout());
    //results in user data strings becoming ""
  },

  componentWillReceiveProps: function(nextProps) {
    if( !this.props.user.username && nextProps.user.username )
      this.setState({isRegistering: false, isLoggingIn: false});
  },

  render: function() {
    const { props: { children,  user:{username}, isLoading },
            state: { isRegistering, isLoggingIn } } = this;

    var thisRef = this;

    return (

      <div className="account-interface-react">
        <table className="account-interface">
          <tbody>
            <tr>
              <td>
                {function() {
                  if(!username) {
                    return (
                      <span>
                        <button className="btn small"
                          onClick={ ()=>hashHistory.push('/register') }>
                          Register
                        </button>
                        <button className="btn small"
                          onClick={ ()=>hashHistory.push('/login') }>
                          Login
                        </button>
                      </span>
                    );
                  } else {
                    return (
                      <form onSubmit={thisRef.onLogout}>
                        <p className="small">{username}</p>
                        <button type="submit" className="btn small"
                          disabled={isLoading}>
                          Log Out
                        </button>
                      </form>
                    );
                  }
                }()}
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
                <Link to="/lobby">Lobby</Link>
                <span> | </span>
                <Link to="/pastDebates">Debate Archive</Link>
                <hr />
              </td>
            </tr>
          </tbody>
        </table>

        {children}

        {isRegistering && <Register />}

        {isLoggingIn && <Login />}

      </div>

    );
  }
});

export default connect((state) => {
    return {
        user: state.user
    };
})(AccountInterface);
