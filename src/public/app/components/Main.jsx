var React = require('react');

var Main = (props) => {
  return (
    <div>
      <div className="row">
        <div className="content column medium-10 large-8 small-centered">{props.children}</div>
                                  {/*default: small-12, implicit*/}
      </div>
    </div>
  );
}

export default Main;
