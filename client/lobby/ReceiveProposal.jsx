var React = require('react');

var ReceiveProposal = function(props) {
  const {challenger: {username}, isChallengerPro, resolution,
         onSubmit, onReject} = props;
  var challengeeSide = isChallengerPro ? "CON" : "PRO";
  var challengerSide = isChallengerPro ? "PRO" : "CON";
  return (

    <div className="fullscreen">
      <div className="dialog receive-proposal">
        <p>
            {username} has challenged you to a debate! You would be &nbsp;
            <strong>{challengeeSide}</strong> and {username} would be &nbsp;
            <strong>{challengerSide}</strong>.
        </p>
        <div className="border resolution">
          <h4>
              Here is the proposed debate resolution:
          </h4>
          <p>
              {resolution}
          </p>
        </div>
        <div className="btns-container">
          <button onClick={onSubmit}>Accept</button>
          <button onClick={onReject}>Decline</button>
        </div>
      </div>
    </div>

  );
}

export default ReceiveProposal;
