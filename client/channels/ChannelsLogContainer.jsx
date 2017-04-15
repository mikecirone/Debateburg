var React = require('react');
var {connect} = require('react-redux');

import ItemLog from 'ItemLog';
import ItemsActions from 'ItemsActions';
import ChannelItem from 'ChannelItem';

const channelStr = 'channels';

var itemsActions = new ItemsActions(channelStr);

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
    return <ItemLog itemType={channelStr} ItemReactClass={ChannelItem}
                                        items={this.props.items} />;
  }
});

export default connect((state) => {
  return {  items: state.channels.data  };
})(ItemLogContainer);
