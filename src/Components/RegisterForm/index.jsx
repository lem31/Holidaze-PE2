import React, {useEffect} from "react";
import { Box, TextField, Button,Tabs, Tab, Typography} from "@mui/material";
import regStyles from "../../CSS_Modules/RegisterForm/register.module.css";
/**
 * RegisterForm component renders a registration form with fields for name, email, password, bio, and images.
 * It handles input changes, image changes, adding new images, and form submission.
 * @param {Object} param0 - The component props.
 * @param {Object} param0.formValues - The form values for the registration form.
 * @param {Function} param0.onInputChange - Function to handle input changes.
 * @param {Function} param0.onImageChange - Function to handle image input changes.
 * @param {Function} param0.onAddImage - Function to handle adding new images.
 * @param {Function} param0.onSubmit - Function to handle form submission.
 * @param {Object} param0.validationErrors - Object containing validation errors for the form fields.
 * @param {string} param0.validationErrors.name - Validation error for the name field.
 * @param {string} param0.validationErrors.email - Validation error for the email field.
 * @param {string} param0.validationErrors.password - Validation error for the password field.
 * @param {string} param0.validationErrors.bio - Validation error for the bio field.
 * @param {string} param0.validationErrors.url - Validation error for the image URL field.
 * @param {string} param0.validationErrors.alt - Validation error for the image alt text field.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @returns {JSX.Element} The rendered component.
 */

const RegisterForm = ({ formValues, onInputChange, onSubmit, validationErrors= {}, defaultBanner, defaultAvatar, activeTab, handleTabChange }) => {

  useEffect(() => {
    console.log("Form values state:", formValues);
  }, [formValues]);
  
  return (
   
<div className ={regStyles.registerFormContainer}>
    <form
      className={regStyles.registerForm}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >

        <Box className={regStyles.tabContainer}>
      <Tabs
      
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Registration Tabs"
        centered
       sx={{
       
 backgroundColor: "transparent",
    borderRadius: "8px",
    padding: "10px",
    "& .MuiTab-root": {
      flex: 1,
      fontWeight: "bold",
     

      transition: "background-color 0.3s",
    },
  }}
      >
        <Tab label="Venue Manager"
        className={regStyles.tab}
        sx={{
 backgroundColor: activeTab === 0 ? "#320e3b" : "rgb(227, 133, 179)", 


      fontWeight: "bold",
      borderRadius: "8px 8px 0 0",
      width: '270px',
      "&.Mui-selected":  { color: activeTab === 0 ? "white" : "black" }, 
    }}
      />
        <Tab label="Customer"  className={regStyles.tab} sx={{
   backgroundColor: activeTab === 1 ? "#320e3b" : "rgb(227, 133, 179)",
     
      fontWeight: "bold",
      borderRadius: "8px 8px 0 0",
       width: '270px',
    "&.Mui-selected": { color: activeTab === 1 ? "white" : "black" },
    }} />
      </Tabs>
</Box>
     <Box sx={{  }}>
        <Typography className={`${regStyles.boxHeader}`} variant="h4" component="h2" align="center"  color="white" fontFamily="Playfair Display">
          {activeTab === 0
            ? "Register as a Venue Manager"
            : "Register as a Customer"}
        </Typography>
       
      <TextField
        label="Name"
        name="name"
        value={formValues.name}
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
        variant="outlined"
        fullWidth
        required
  sx={{
      "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
        marginBottom: "20px",
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
      {validationErrors.name && <p>{validationErrors.name}</p>}
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formValues.email}
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
        variant="outlined"
        fullWidth
        required
       sx={{
      "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
        marginBottom: "20px",
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
      {validationErrors.email && <p style={{ color: "red" }}>{validationErrors.email}</p>}
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
        marginBottom: "20px",
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
      {validationErrors.password && <p>{validationErrors.password}</p>}
      <TextField
        label="Bio"
        name="bio"
        value={formValues.bio}
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
        variant="outlined"
        fullWidth
        multiline
        rows={3}
       sx={{
      "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
        marginBottom: "20px",
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
      {validationErrors.bio && <p>{validationErrors.bio}</p>}
   
        <TextField
          label="Banner Image URL"
          name="bannerUrl"
          value={formValues.bannerUrl || defaultBanner.url}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          variant="outlined"
          fullWidth
           sx={{
      "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
        marginBottom: "20px",
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
        {validationErrors.bannerUrl && <p>{validationErrors.bannerUrl}</p>}
        <TextField
          label="Banner Alt Text"
          name="bannerAlt"
          value={formValues.bannerAlt || defaultBanner.alt}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          variant="outlined"
          fullWidth
           sx={{
      "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
        marginBottom: "20px",
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
        {validationErrors.bannerAlt && <p>{validationErrors.banner.alt}</p>}
   

        <TextField
          label="Avatar Image URL"
          name="avatarUrl"
          value={formValues.avatarUrl || defaultAvatar.url}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          variant="outlined"
          fullWidth
       sx={{
      "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
        marginBottom: "20px",
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
        {validationErrors.avatarUrl && <p>{validationErrors.avatar.url}</p>}
        <TextField
          label="Avatar Alt Text"
          name="avatarAlt"
          value={formValues.avatar.alt}
          onChange={(e) => onInputChange(e.target.name, e.target.value)}
          variant="outlined"
          fullWidth
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
        {validationErrors.avatarAlt && <p>{validationErrors.avatar.alt}</p>}
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </form>
  </div>
  );
};

export default RegisterForm;
