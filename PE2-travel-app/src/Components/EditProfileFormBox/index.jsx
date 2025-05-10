import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import EditProfileForm from "../EditProfileForm";
import EditProfileFormValidator from "../EditProfileFormValidator";
import useMyStore from "../../Store";




const EditProfileFormBox = () => {



    const {userProfile, updateUserProfile, successMessage, setSuccessMessage} = useMyStore();
  const defaultBanner = {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Default Banner",
  }
  const defaultAvatar = {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Default Avatar",
  }

 const [validationErrors, setValidationErrors] = useState({});



  const [formValues, setFormValues] = useState({
    name: "",
    email:  "",
    password: "",
    bio: "",    
    banner: defaultBanner,
    avatar: defaultAvatar,
    venueManager: true,
  });

useEffect(() => {
    console.log("userProfile:", userProfile);
  if (userProfile) {
    setFormValues({
        name: userProfile.data.name || "",       
        email: userProfile.data.email || "",
        password: "",
        bio: userProfile.data.bio || "",
        banner: userProfile.data.banner || defaultBanner,
        avatar: userProfile.data.avatar || defaultAvatar,
        venueManager: true,
    });
  }
}, [userProfile]);



 

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (index, name, value) => {
    const updatedImage = { ...formValues[name], [index]: value };
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: updatedImage,
    }));
  };

  const handleAddImageInput = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      images: [...prevValues.images, { url: "", alt: "" }],
    }));
  };

  const handleFormSubmit = async (event) => {
    if(!event) return;
    event.preventDefault();

    const updatedFormValues = {
      ...formValues,
      banner: {
        url: formValues.banner.url || defaultBanner.url,
        alt: formValues.banner.alt || defaultBanner.alt,
      },
      avatar: {
        url: formValues.avatar.url || defaultAvatar.url,
        alt: formValues.avatar.alt || defaultAvatar.alt,
      },
    };

    const userData = updatedFormValues;
    try{
 await EditProfileFormValidator.validate(updatedFormValues, {abortEarly: false});
  setValidationErrors({});
  const success = await updateUserProfile(userData);
  if (success) {
    setSuccessMessage('Venue deleted successfully!');
  } else {
    console.error("Failed to update profile");
  }
} catch (error) {
    console.error("Error updating profile:", error);}};

  return (
 
   

      <Box sx={{ marginTop: 3 }}>
        {!userProfile ? (
            <Typography> Loading Profile...</Typography>
        ) : (
        
      
        <EditProfileForm
          formValues={formValues}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onAddImage={handleAddImageInput}
          onSubmit={handleFormSubmit}
          validationErrors={validationErrors}
          defaultBanner={defaultBanner}
          defaultAvatar={defaultAvatar}
          successMessage={successMessage}
        
        />
    )}
      </Box>

  );}


export default EditProfileFormBox;
