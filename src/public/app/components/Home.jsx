var React = require('react');
var {connect} = require('react-redux');

var Home = React.createClass({
  render: function() {
    var {templateData1} = this.props;
    return (
      <div>
        <p>Home</p>
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
)(Home);
