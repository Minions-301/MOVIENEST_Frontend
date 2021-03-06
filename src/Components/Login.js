import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Header.css';
function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className= "loginbtn" onClick={loginWithRedirect}>LOGIN</button>
  );
}
export default LoginButton;
