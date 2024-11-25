import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login({ onSuccess }) {
  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        onSuccess={onSuccess}   // Pass the onSuccess prop to handle the login success
        onError={onFailure}     // Handle login failure
      />
    </div>
  );
}

export default Login;
