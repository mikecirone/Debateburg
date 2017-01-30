var React = require('react');
var {connect} = require('react-redux');

var Home = React.createClass({
  render: function() {
    var {} = this.props;
    return (
      <div>
        <p>Home</p>
        <p></p>
      </div>
    );
  }
});

export default connect()(Home);
