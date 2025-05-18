import React from "react";
import { Box, TextField, Button } from "@mui/material";

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
