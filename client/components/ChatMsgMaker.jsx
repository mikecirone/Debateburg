import React, { PropTypes } from 'react';

var ChatMsgMaker = React.createClass({
  getDefaultProps: function() {
    return { disabled: false }
  },
  propTypes: {
    onSubmit: PropTypes.func.isRequired
  },
  render: function() {
    const {onSubmit, disabled} = this.props;
    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled}>
          <input id="chat-input" type="text" autoFocus></input>
          <button type="submit" className="btn btn-primary">Enter</button>
        </fieldset>
      </form>
    );
  }
});

export default ChatMsgMaker;
