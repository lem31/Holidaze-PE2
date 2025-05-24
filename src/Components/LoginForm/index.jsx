import React from "react";
import { Box, TextField, Button } from "@mui/material";
import loginStyles from "../../CSS_Modules/Login/login.module.css";
import gStyles from '../../CSS_Modules/Global/global.module.css';
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

    <div className={loginStyles.loginFormContainer}>

    <form
    className={loginStyles.loginForm}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <h1 className={gStyles.h1White}>LOGIN</h1>
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
          sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "20px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    },}}
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
         sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "14px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    },}}
      />
    
   </Box>
      
    
      <Button className={gStyles.buttonPrimary} type="submit" variant="contained" color="primary" >
        Login
      </Button>
    </form>
    </div>
  )};

export default LoginForm;
