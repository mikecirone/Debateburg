var React = require('react');
//needed, not sure why

import ErrorModalContainer from 'ErrorModalContainer';

//stateless functional component
var Register = function(props) {
    var {isFetching, authToken, onRegister, error} = props;
    return (
      <div>
        <p>Register</p>
        <p className={!isFetching && 'invisible'}>Loading...</p>
        <button className="button" onClick={onRegister}>
          Go
        </button>
        {/* <p className={!error.isActive && 'invisible'}>{error.message}</p> */}
        {error.isActive && <ErrorModalContainer message={error.message} />}
      </div>
    );
  }

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
