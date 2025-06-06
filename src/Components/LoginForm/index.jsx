/**
 * LoginForm component renders a login form with email and password fields.
 * It handles input changes and form submission.
 * @param {*} param0
 * @param {Object} param0.formValues - The form values for the login form.
 * @param {Function} param0.onInputChange - Function to handle input changes.
 * @param {Function} param0.onSubmit - Function to handle form submission.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @example
 * return (
 *  <LoginForm formValues={formValues} onInputChange={handleInputChange} onSubmit={handleFormSubmit} />
 * );
 */

import { Box, TextField, Button } from "@mui/material";
import loginStyles from "../../CSS_Modules/Login/login.module.css";
import gStyles from "../../CSS_Modules/Global/global.module.css";

const LoginForm = ({ onSubmit, register, errors }) => {
  return (
    <div className={loginStyles.loginFormContainer}>
      <form
        className={loginStyles.loginForm}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <h1 className={gStyles.h1White}>LOGIN</h1>
        <Box sx={{ position: "relative" }}>
          <TextField
            label="Email"
            {...register("email")}
            type="email"
            variant="outlined"
            fullWidth
            required
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message || " "}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                marginBottom: "12px",
              },
              "& .MuiInputLabel-root": {
                color: "white",
                fontFamily: "Lato",
                fontSize: "16px",
                marginTop: "-10px",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#e56399",
              },
            }}
          />

          <TextField
            label="Password"
            {...register("password")}
            type="password"
            variant="outlined"
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password?.message || " "}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                marginBottom: "8px",
                marginTop: "16px",
              },
              "& .MuiInputLabel-root": {
                color: "white",
                fontFamily: "Lato",
                fontSize: "16px",
                marginTop: "5px",
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#e56399",
              },
            }}
          />
        </Box>

        <Button
          className={gStyles.buttonPrimary}
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
