var React = require('react');
var {Modal, Button, FormGroup, ControlLabel, FormControl, Radio} = require('react-bootstrap');

var Proposal = React.createClass({
    handleClick: function() {
      this.props.onSubmit(this.resolutionInput.value);
    },
    render: function() {
      const {challengee: {username}, resolutionInputRef,
             onClose, onSubmit} = this.props;
      return (
        <div>
          <Modal show={true} onHide={onClose}>

            <Modal.Body>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Please enter your proposed debate resolution:</ControlLabel>
                <FormControl componentClass="textarea"
                  inputRef={(ref) => {this.resolutionInput = ref}}
                  placeholder="The Giants are better than the Dodgers." />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Choose a side:</ControlLabel>
                {<br />}
                <Radio name="radioGroup" inline> Pro </Radio>
                {' '}
                <Radio name="radioGroup" inline> Con </Radio>
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.handleClick} block>Challenge {username}</Button>
            </Modal.Footer>

          </Modal>
        </div>
      );
    }
})

export default Proposal;
