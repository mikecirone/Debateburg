var React = require('react');
import jQuery from 'jQuery';
import moment from 'moment';
import uuid from 'node-uuid';

import createItemMakerContainer from 'createItemMakerContainer';
import createItemLogContainer from 'createItemLogContainer';
import ChannelItem from 'ChannelItem';

const channelStr = 'channels';

var ChannelsLogContainer = createItemLogContainer(channelStr, ChannelItem);

var ChannelItemMakerContainer = createItemMakerContainer(channelStr, () => {
  return {
    name: jQuery(`#${channelStr}-input`).val(),
    createdAt: moment.utc().format('lll'),
    id: `${Date.now()}${uuid.v4()}`
  };
});

import io from 'socket.io-client';
const socket = io('', { path: '/channels' });

var ChannelsContainer = React.createClass({
  render: function() {
    return (
      <div>
        <ChannelsLogContainer socket={socket} />
        <ChannelItemMakerContainer socket={socket} />
      </div>
    );
  }
});

export default ChannelsContainer;
