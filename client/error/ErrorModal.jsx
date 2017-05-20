var React = require('react');

var ErrorModal = function(props) {
  var {title, message, handleClose} = props;

  return (

    <div className="fullscreen error">
      <div className="dialog">
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="btns-container">
          <button onClick={()=>handleClose()}>
            Okay
          </button>
        </div>
      </div>
    </div>

  );
}

export default ErrorModal;
