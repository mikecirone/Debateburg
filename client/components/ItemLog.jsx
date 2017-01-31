import React, { PropTypes } from 'react';

var ItemLog = React.createClass({

  propTypes: {
    items: PropTypes.array.isRequired
  },

  render: function() {
    const {ItemReactClass, itemType, items} = this.props;

    return (
      <div id={`${itemType}-log`}>
        <ul>
          {items.map(item =>
            <ItemReactClass item={item} key={item.id} />
          )}
        </ul>
      </div>
    );
  }
});

export default ItemLog;
