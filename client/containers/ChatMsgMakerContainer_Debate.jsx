var React = require('react');
var {connect} = require('react-redux');

import ChatMsgMakerContainer from 'ChatMsgMakerContainer';

//As alternative, could add mergeProps to ChatMsgMakerContainer
//and have DebateRoom do:
//  <ChatMsgMakerContainer disabled={this.props.disabled} />

var ChatMsgMakerContainer_Debate = React.createClass({

  render: function() {
    return (
      <ChatMsgMakerContainer disabled={this.props.disabled} />
    );
  }
});

const mapStateToProps = function(state) {
  // disabled: state.debate.debater.active !== state.user.id;
  disabled: true;
};

export default connect(mapStateToProps)(ChatMsgMakerContainer_Debate);
