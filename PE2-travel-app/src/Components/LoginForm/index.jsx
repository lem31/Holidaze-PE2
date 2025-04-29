import React from "react";
import { Box, TextField, Button } from "@mui/material";

const LoginForm = ({ formValues, onInputChange, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >

<Box sx={{ marginBottom: 2 }}>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formValues.email}
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
        variant="outlined"
        fullWidth
        required
        autoComplete='email'
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formValues.password}
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
        variant="outlined"
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
    
   </Box>
      
    
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </form>
  )};

export default LoginForm;
