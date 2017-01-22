var React = require('react');

var Main = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-1  col-md-2 col-lg-3"></div>
        <div className="col-sm-10 col-md-8 col-lg-6">{props.children}</div>
        <div className="col-sm-1  col-md-2 col-lg-3"></div>
      </div>
    </div>
  );
}

export default Main;
