var React = require('react');
var {Modal, Button} = require('react-bootstrap');

var ReceiveProposal = function(props) {
  const {challenger: {username}, resolution, onSubmit, onReject} = props;

  return (
    <div>
      <Modal show={true} onHide={onReject}>

        <Modal.Body>
          {/* <p>{username} has challenged you to a debate! You would be {challengeeSide}
             and {username} would be {challengerSide}.</p> */}
          <p>Here is the proposed debate resolution:</p>
          <p>{resolution}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="primary" onClick={onSubmit} block>Accept</Button>
          <Button bsStyle="primary" onClick={onReject} block>Decline</Button>
        </Modal.Footer>

      </Modal>
    </div>
  );
}

export default ReceiveProposal;
