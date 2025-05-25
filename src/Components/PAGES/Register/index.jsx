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

import RegisterBox from "../../RegistrationBox";
import gStyles from "../../../CSS_Modules/Global/global.module.css";
import regStyles from "../../../CSS_Modules/RegisterForm/register.module.css";

function Register() {
  return (
    <div>
      <div className={regStyles.h1Reg}>
        <h1 className={gStyles.h1Black}>Register</h1>
      </div>
      <RegisterBox />
    </div>
  );
}

export default Register;
