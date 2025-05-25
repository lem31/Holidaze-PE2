/**
 * LoginBox component handles user login functionality.
 * It includes a form for entering email and password,
 * and handles form submission to authenticate the user.
 * It uses the onLogin function to send a login request to the API.
 * The component also uses the useNavigate hook from react-router-dom
 * to navigate to different routes after successful login.
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @example
 * return (
 * <LoginBox />
 * );
 */

import { Box, Typography } from "@mui/material";
import LoginForm from "../LoginForm";
import onLogin from "../../API/OnLogin";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import LoginFormValidator from "../LoginFormValidator/loginValidator.jsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginBox = () => {
  const API_URL = "https://v2.api.noroff.dev/auth/login";
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginFormValidator),
  });

  const handleFormSubmit = async (formData) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await onLogin(API_URL, formData, navigate);

      if (response.errors?.length > 0) {
        setErrorMessage(response.errors[0].message);
      } else {
        setErrorMessage("Unexpected error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        "A network error occurred. Please check your connection and try again."
      );
    }
  };

  return (
    <Box>
      <Box sx={{ marginTop: 3 }}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <LoginForm
          onSubmit={handleSubmit(handleFormSubmit)}
          register={register}
          errors={errors}
        />
      </Box>
    </Box>
  );
};

export default LoginBox;
