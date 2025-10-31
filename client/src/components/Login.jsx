import React from 'react';

const Login = () => {
  const googleAuth = () => {
    window.open(
      'http://localhost:5000/auth/google',
      '_self'
    );
  };

  const facebookAuth = () => {
    window.open(
      'http://localhost:5000/auth/facebook',
      '_self'
    );
  };

  const githubAuth = () => {
    window.open(
      'http://localhost:5000/auth/github',
      '_self'
    );
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button className="login-button google-button" onClick={googleAuth}>Login with Google</button>
      <button className="login-button facebook-button" onClick={facebookAuth}>Login with Facebook</button>
      <button className="login-button github-button" onClick={githubAuth}>Login with GitHub</button>
    </div>
  );
};

export default Login;