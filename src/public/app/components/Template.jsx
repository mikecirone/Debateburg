var React = require('react');
var {connect} = require('react-redux');

var Template = React.createClass({
  render: function() {
    var {templateData1} = this.props;
    return (
      <div>
        <p>Template page</p>
        <p>{templateData1}</p>
      </div>
    );
  }
});

export default connect(
  (state) => {
    return {
      templateData1: state.templateData.templateData1
    };
  }
)(Template);
