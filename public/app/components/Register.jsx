var React = require('react');
//needed, not sure why

import ErrorModalContainer from 'ErrorModalContainer';

//stateless functional component,
//but needs to be React class to work with unit testing
var Register = React.createClass({
  render: function() {
    var {isFetching, authToken, onRegister, error} = this.props;
    return (
      <div>
        <p>Register</p>
        <p id="loading-text" className={!isFetching && 'invisible'}>Loading...</p>
        <button className="button" onClick={onRegister}>
          Go
        </button>
        {/* <p className={!error.isActive && 'invisible'}>{error.message}</p> */}
        {error.isActive && <ErrorModalContainer message={error.message} />}
      </div>
    );
  }
})

export default Register;

// var React = require('react');
//
// var Register = React.createClass({
//   render: function() {
//     var {isFetching, authToken, onRegister} = this.props;
//
//     return (
//       <div>
//         <p>Register</p>
//         <p className={!isFetching ? 'invisible' : ''}>Loading...</p>
//         <button className="button" onClick={onRegister}>
//           Go
//         </button>
//       </div>
//     );
//   }
// });
//
// export default Register;
