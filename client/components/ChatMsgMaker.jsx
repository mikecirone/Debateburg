import React, { PropTypes } from 'react';

var ChatMsgMaker = React.createClass({
  getDefaultProps: function() {
    return { disabled: false }
  },
  propTypes: {
    handleSubmit: PropTypes.func.isRequired
  },
  render: function() {
    const {handleSubmit, disabled} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <fieldset disabled={disabled}>
          <input type="text" autoFocus></input>
          <button className="button">Enter</button>
        </fieldset>
      </form>
    );
  }
});

export default ChatMsgMaker;
