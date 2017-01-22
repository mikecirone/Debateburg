var React = require('react');
var {Modal, Button} = require('react-bootstrap');

var ErrorModal = function(props) {
  var {title, message, handleClose} = props;

  return (
    <div>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {message}
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="primary" onClick={handleClose}>Okay</Button>
        </Modal.Footer>

      </Modal>
    </div>
  );
}

export default ErrorModal;
