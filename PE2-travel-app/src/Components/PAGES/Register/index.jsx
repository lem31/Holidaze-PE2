import RegisterBox from "../../RegistrationBox";

/**
 * Register component renders the registration page of the application.
 * It includes a title and the RegisterBox component for user registration.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @example
 * return (
 * <Register />
 * );
 */

function Register() {
  return (
    <div>
      <h1>Register</h1>
<RegisterBox/>
    </div>
  );
}

export default Register;