var React = require('react');
var {connect} = require('react-redux');
import { hashHistory } from 'react-router';

import ReceiveProposal from 'ReceiveProposal';
import {setActiveChannel} from 'activeChannelActions';

var ReceiveProposalContainer = React.createClass({

  componentDidMount: function() {
    const {socket, dispatch} = this.props;
    socket.on('invite to channel', ({id, name, challengee}) => {
      dispatch(setActiveChannel({id, name}));
      hashHistory.push('/debate');
    });
  },

  handleSubmit: function() {
    const {socket, challenger} = this.props;
    socket.emit('accept challenge', challenger);
  },

  handleReject: function() {
    const {socket, challenger, onClose} = this.props;
    socket.emit("reject challenge", challenger);
    onClose();
  },

  render: function() {
    const {challenger, resolution, sides, onClose} = this.props;
    var isChallengerPro = (sides.pro===challenger._id) ? true : false;
    return (<ReceiveProposal onSubmit={this.handleSubmit} onReject={this.handleReject}
                      challenger={challenger} resolution={resolution}
                      isChallengerPro={isChallengerPro} />);
  }
});

export default connect()(ReceiveProposalContainer);
