import React, { PropTypes } from 'react';

var ItemMaker = React.createClass({
  getInitialState: function() {
    return { message: '' }
  },
  getDefaultProps: function() {
    return { disabled: false }
  },
  propTypes: {
    onSubmit: PropTypes.func.isRequired
  },
  handleMessageChange: function(event) {
    this.setState({message: event.target.value})
  },
  handleSubmit: function() {
    this.props.onSubmit(this.state.message);
  },
  componentDidMount: function() {
    var thisRef = this;
    $('textarea.item-maker-textarea').keydown(function(e){
      if(e.which == 13){
        e.preventDefault();
        thisRef.handleSubmit();
        thisRef.setState({message: ''});
       }
    });
  },
  render: function() {
    const {itemType, value, onSubmit, onChange, disabled} = this.props;

    return (

      <form className="item-maker">
        <table className="message-composer">
          <tbody>
            <tr>
              <td>
                <textarea rows="2" value={this.state.message} disabled={disabled}
                  className="item-maker-textarea"
                  onChange={this.handleMessageChange}></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

    );
  }
});

export default ItemMaker;
