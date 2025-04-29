import React from 'react';
import LoginBox from '../../LoginBox';

/**
 * Login component renders the login page.
 * It includes a title and the LoginBox component for user login.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @example
 * return (
 *  <Login />
 * );
 */

function Login() {
  return (
    <div>
      <h1>Login</h1>
        <LoginBox />
    </div>
  );
}
export default Login;