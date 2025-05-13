import React, {useEffect, useState} from "react";
import { Box, TextField, Button } from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EditProfileFormValidator from "../EditProfileFormValidator";
import useMyStore from "../../Store";

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
  handleFormSubmit,
  validationErrors = {},
  setIsEditProfileVisible,
  isEditProfileVisible,
  defaultAvatar,
  defaultBanner,
 

}) => {


  const { userProfile, updateUserProfile } = useMyStore();
 

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(EditProfileFormValidator),
    mode: "onSubmit",
    defaultValues: {
      bio: "",
      banner: { url: "", alt: "" },
      avatar: { url: "", alt: "" },
    },
  });
      
    console.log("userProfile", userProfile);




  useEffect(() => {
    if (userProfile) {
      reset({
        bio: userProfile.data?.bio || "",
        banner: {
          bannerUrl: userProfile.data?.banner?.url || defaultBanner?.url,
          bannerAlt: userProfile.data?.banner?.alt || defaultBanner?.alt,
        },
        avatar: {
          avatarUrl: userProfile.data?.avatar?.url || defaultAvatar?.url,
          avatarAlt: userProfile.data?.avatar?.alt || defaultAvatar?.alt,
        },
      });
    }
  }, [userProfile, reset]);
  
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)
      }
    >
      <Controller
        name="bio"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            sx={{ marginBottom: 2 }}
          />
        )}
      />
      {validationErrors.bio && <p>{validationErrors.bio}</p>}

      <Box sx={{ marginBottom: 2 }}>
        <Controller
        
          name="bannerUrl"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
             
              variant="outlined"
              fullWidth
            />
          )}
        />
        {validationErrors.bannerUrl && <p>{validationErrors.banner.url}</p>}
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        {validationErrors.bannerUrl && <p>{validationErrors.bannerUrl}</p>}
        <Controller
         
          name="bannerAlt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
            
              variant="outlined"
              fullWidth
            />
          )}
        />
        {validationErrors.bannerAlt && <p>{validationErrors.banner.alt}</p>}
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Controller
    
          name="avatarUrl"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
         
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 1 }}
            />
          )}
        />
        {validationErrors.avatarUrl && <p>{validationErrors.avatar.url}</p>}
        <Controller
     
          name="avatarAlt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
           
              variant="outlined"
              fullWidth
            />
          )}
        />
        {validationErrors.avatarAlt && <p>{validationErrors.avatar.alt}</p>}
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Changes
      </Button>

      <Button
        type="button"
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => setIsEditProfileVisible(!isEditProfileVisible)}
      >
        {" "}
        Close{" "}
      </Button>
    </form>
  );
};

export default EditProfileForm;
