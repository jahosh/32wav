import React from 'react';

const OAuthButtons = () => {
  return (
    <div>
      <a className="waves-effect waves-light btn social google">
        <i className="fa fa-google"></i> Sign in with google
      </a>

      <a className="waves-effect waves-light btn social facebook">
        <i className="fa fa-facebook"></i> Sign in with facebook
      </a>

      <a className="waves-effect waves-light btn social soundcloud">
        <i className="fa fa-soundcloud"></i> Sign in with soundcloud
      </a>
    </div>
  );
};

export default OAuthButtons;