var React = require('react');
var {connect} = require('react-redux');

import ItemLog from 'ItemLog';
import ItemsActions from 'ItemsActions';

function createItemLogContainer(itemType, ItemReactClass) {

  var itemsActions = new ItemsActions(itemType);

  var ItemLogContainer = React.createClass({

    //TODO: consider moving this to mapDispatchToProps
    componentDidMount: function() {
      const { socket, dispatch } = this.props;
      dispatch(itemsActions.fetchItems());
      socket.on(`recv new item`, item => {
          dispatch(itemsActions.receiveRawItem(item));
        }
      );
    },

    render: function() {
      return <ItemLog itemType={itemType} ItemReactClass={ItemReactClass}
                                          items={this.props.items} />;
    }
  });
  return connect((state) => {
    return {items: state[itemType].data};
  })(ItemLogContainer);
}

export default createItemLogContainer;
