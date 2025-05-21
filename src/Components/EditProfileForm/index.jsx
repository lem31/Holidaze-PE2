import React, {useEffect, useState} from "react";
import { Box, TextField, Button } from "@mui/material";
import {useForm, Controller, set} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EditProfileFormValidator from "../EditProfileFormValidator";
import useMyStore from "../../Store";
import profileStyles from "../../CSS_Modules/Profile/profile.module.css";
import gStyles from "../../CSS_Modules/Global/global.module.css";

/**
 * EditProfileForm component renders a form for editing user profile with fields for name, email, password, bio, and images.
 * It handles input changes, image changes, adding new images, and form submission.
 * @param {Object} param0 - The component props.
 * @param {Object} param0.formValues - The form values for the edit profile form.
 * @param {Function} param0.onInputChange - Function to handle input changes.
 * @param {Function} param0.onImageChange - Function to handle image input changes.
 * @param {Function} param0.onAddImage - Function to handle adding new images.
 * @param {Function} param0.onSubmit - Function to handle form submission.
 * @param {Object} param0.validationErrors - Object containing validation errors for the form fields.
 * @returns {JSX.Element} The rendered component.
 * @component
 */
const EditProfileForm = ({

 
  setIsEditProfileVisible,
  isEditProfileVisible,
  defaultAvatar,
  defaultBanner,
  setSuccessMessage,
  toggleForm,


 

}) => {


  const { userProfile, updateUserProfile } = useMyStore();
  const {fetchUserProfile} = useMyStore();
  const [validationErrors, setValidationErrors] = useState({});
 

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(EditProfileFormValidator),
    mode: "onSubmit",
    defaultValues: {
      bio: "",
      banner: { url: defaultBanner?.url || "", alt: defaultBanner?.alt || "" },
      avatar: { url: defaultAvatar?.url || "", alt: defaultAvatar?.alt || "" },
    },
  });
      
    console.log("userProfile", userProfile);




  useEffect(() => {
    if (userProfile) {
      reset({
        bio: userProfile?.bio || "",
        banner: {
         url: userProfile?.banner?.url || defaultBanner?.url,
          alt: userProfile?.banner?.alt || defaultBanner?.alt,
        },
        avatar: {
          url: userProfile?.avatar?.url || defaultAvatar?.url,
          alt: userProfile?.avatar?.alt || defaultAvatar?.alt,
        },
      });
    }
  }, [userProfile, reset]);



  const handleFormSubmit = async ( data) => {
  
  
      const updatedFormValues = {
        ...data,
        banner: {
         url: data.banner?.url?.trim() || defaultBanner?.url,
          alt: data.banner?.alt?.trim() || defaultBanner?.alt,
        },
        avatar: {
          url: data.avatar?.url?.trim() || defaultAvatar?.url,
         alt: data.avatar?.alt?.trim() || defaultAvatar?.alt,
        },
      };
  
      const userData = updatedFormValues;
      try {
        await EditProfileFormValidator.validate(updatedFormValues, {
          abortEarly: false,
        });
        setValidationErrors({});
        console.log("Form data being submitted:", data);
  
        const success = await updateUserProfile(userData);
        if (success) {
         
          setSuccessMessage("Profile Updated successfully!");
          setTimeout(() => {
            toggleForm();
          }, 500);
          fetchUserProfile();
        } else {
          console.error("Failed to update profile");
          setError("api", { message: "Failed to update profile" });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
  
  
  return (

<div className={profileStyles.editProfileFormDiv}>
    <form
    className={profileStyles.editProfileForm}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
          <h2 className={gStyles.h2White}>Edit Profile</h2>
      <Controller
   
        name="bio"
        control={control}
        render={({ field }) => (
          <TextField
       
            {...field}
            
             label="Bio"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
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
        )}
      />
      {validationErrors.bio && <p>{validationErrors.bio}</p>}

      <Box >
        <Controller
        
          name="banner.url"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
             label="Banner URL"
              variant="outlined"
              fullWidth
               sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
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
          )}
        />
        {validationErrors.bannerUrl && <p>{validationErrors.banner.url}</p>}
      </Box>
      <Box >
        {validationErrors.bannerUrl && <p>{validationErrors.bannerUrl}</p>}
        <Controller
         
          name="banner.alt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
            label="Banner Alt Text"
              variant="outlined"
              fullWidth
               sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
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
          )}
        />
        {validationErrors.bannerAlt && <p>{validationErrors.banner.alt}</p>}
      </Box>
      <Box >
        <Controller
    
          name="avatar.url"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
         label="Avatar URL"
              variant="outlined"
              fullWidth
            sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
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
          )}
        />
        {validationErrors.avatarUrl && <p>{validationErrors.avatar.url}</p>}
      </Box>
      <Box >
        <Controller
     
          name="avatar.alt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
           label="Avatar Alt Text"
              variant="outlined"
              fullWidth
           
               sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",

    },
    "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    },
  }}
            />
          )}
        />
        {validationErrors.avatarAlt && <p>{validationErrors.avatar.alt}</p>}
      </Box>

      <div className={profileStyles.buttonDiv}>
      <Button className={gStyles.buttonPrimary} type="submit" variant="contained"  >
        Save Changes
      </Button>

      <Button
      className={gStyles.buttonSecondary}
        type="button"
        variant="contained"
        color="secondary"
      
        onClick={() => setIsEditProfileVisible(!isEditProfileVisible)}
      >
        {" "}
        Cancel{" "}
      </Button>
      </div>
    </form>
    </div>
  );
};

export default EditProfileForm;
