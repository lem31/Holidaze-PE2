/**
 * Yup validation schema for the login form.
 *
 * Validates:
 * - email: Must be a valid Noroff student email address (ending with @stud.noroff.no) and is required.
 * - password: Must be at least 8 characters long and is required.
 *
 * @type {Yup.ObjectSchema}
 */

import * as Yup from "yup";

const LoginFormValidator = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^.+@stud\.noroff\.no$/,
      "Email must be a valid Noroff email address."
    )
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

export default LoginFormValidator;
