import React, { PropTypes } from 'react';

var ItemMaker = React.createClass({
  getDefaultProps: function() {
    return { disabled: false }
  },
  propTypes: {
    onSubmit: PropTypes.func.isRequired
  },
  render: function() {
    const {itemType, value, onSubmit, onChange, disabled} = this.props;
    return (
      <form onSubmit={onSubmit}>
        <fieldset disabled={disabled}>
          <input value={value} onChange={onChange}
            id={`${itemType}-input`} type="text" autoFocus></input>
          <button type="submit" className="btn btn-primary">Enter</button>
        </fieldset>
      </form>
    );
  }
});

export default ItemMaker;
