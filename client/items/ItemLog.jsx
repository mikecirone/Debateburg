import React, { PropTypes } from 'react';

var ItemLog = React.createClass({

  propTypes: {
    items: PropTypes.array.isRequired
  },

  render: function() {
    const {ItemReactClass, itemType, items} = this.props;

    return (
      <div id={`${itemType}-log`}>
          {function() {
            var children = [];
            for(var i=0; i < items.length; ++i) {
              children.push(<ItemReactClass item={items[i]} key={i} />);
            }
            return children;
          }()}
      </div>
    );
  }
});

export default ItemLog;
