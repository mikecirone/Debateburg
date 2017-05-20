var React = require('react');
var axios = require('axios');
var moment = require('moment');
var uuid = require('node-uuid');
import { hashHistory } from 'react-router';
var {connect} = require('react-redux');

import Proposal from 'Proposal';
import {setActiveChannel} from 'activeChannelActions';
import {PRO, CON} from 'constants';
//TODO: move constants to debateConstants
import {setDebate} from 'debateActions';

var ProposalContainer = React.createClass({

  getInitialState: function() {
    return { resolution: '', side: PRO, sides: null };
  },

  componentDidMount: function() {
    const { props: {socket, onClose, dispatch, challengee, user} } = this;
    var thisRef = this;
    socket.on("recv accept challenge", function() {
      var channelId = `${Date.now()}${uuid.v4()}`;
      axios.post('channels_items', {
        resolution: thisRef.state.resolution,
        sides: thisRef.state.sides,
        createdAt: moment.utc().format('lll'),
        id: channelId
      })
      .then(()=> {
        var channelData = {
          id: channelId, resolution: thisRef.state.resolution, isDebate: true
        };
        dispatch(setActiveChannel(channelData));
        dispatch(setDebate({ sides: thisRef.state.sides, user }));
        //TODO: get rid of inserting user this way, re-form reducer logic
        //      to deduce isUserActive by viewing debate and user lesser states
        var obj = { challengee };
        Object.assign(obj, channelData, {sides: thisRef.state.sides});
        socket.emit('invite to channel', obj);
        hashHistory.push('/debate');
      })
      .catch( e => console.log(e));
      //TODO: add error-handling
    });
    socket.on("recv reject challenge", function() {
      onClose();
      //TODO: add error dialog that reports challenge rejection to user
    });
  },
  componentWillUnmount: function() {
    const {socket} = this.props;
    socket.removeListener("recv accept challenge");
    socket.removeListener("recv reject challenge");
  },

  handleSubmit: function(resolution, side) {
    const {challengee, challenger, socket} = this.props;
    var sides = {
      pro: (side===PRO) ? challenger : challengee,
      con: (side===CON) ? challenger : challengee
    };
    this.setState({resolution, side, sides});
    socket.emit('challenge', {challengee, challenger, resolution, sides});
  },

  render: function() {
    const {challengee, onClose} = this.props;
    return (<Proposal onSubmit={this.handleSubmit} onClose={onClose}
      challengee={challengee} />);
  }
});

export default connect((state)=>{
  return {
    user: state.user
  };
})(ProposalContainer);
