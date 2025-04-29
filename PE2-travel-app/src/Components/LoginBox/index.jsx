import React, { useState } from "react";
import { Box,Typography } from "@mui/material";
import LoginForm from "../LoginForm";
import onLogin from "../../API/OnLogin";
import {useNavigate} from "react-router-dom";

const LoginBox = () => {
  const API_URL = "https://v2.api.noroff.dev/auth/login";
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await onLogin(API_URL, formValues, navigate);
      console.log("Login successful:", response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Login
        </Typography>
        <LoginForm
          formValues={formValues}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
        />
      </Box>
    </Box>
  );
};

export default LoginBox;
