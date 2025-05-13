import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import EditProfileForm from "../EditProfileForm";
import EditProfileFormValidator from "../EditProfileFormValidator";



const EditProfileFormBox = ({
  toggleForm,
  setSuccessMessage,
  isEditProfileVisible,
  setIsEditProfileVisible,

}) => {
  const [validationErrors, setValidationErrors] = useState({});


  const defaultBanner = {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Default Banner",
  };
  const defaultAvatar = {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Default Avatar",
  };


 
   




  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };



  const handleAddImageInput = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      images: [...prevValues.images, { url: "", alt: "" }],
    }));
  };

  const handleFormSubmit = async ( formValues) => {


    const updatedFormValues = {
      ...formValues,
      banner: {
        bannerUrl: formValues.banner.url?.trim() || defaultBanner.url,
        bannerAlt: formValues.banner.alt?.trim() || defaultBanner.alt,
      },
      avatar: {
        avatarUrl: formValues.avatar.url?.trim() || defaultAvatar.url,
        avaterAlt: formValues.avatar.alt?.trim() || defaultAvatar.alt,
      },
    };

    const userData = updatedFormValues;
    try {
      await EditProfileFormValidator.validate(updatedFormValues, {
        abortEarly: false,
      });
      setValidationErrors({});
      console.log("Form data being submitted:", formValues);

      const success = await updateUserProfile(userData);
      if (success) {
        setSuccessMessage("Profile Updated successfully!");
        setTimeout(() => {
          toggleForm();
        }, 500);
      } else {
        console.error("Failed to update profile");
        setError("api", { message: "Failed to update profile" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      {isEditProfileVisible && (
        <Box sx={{ marginTop: 3,  }}>
          {!userProfile ? (
            <Typography>Loading Profile...</Typography>
          ) : (
            <div
              style={{
                position: "fixed",
                width: "80vw",
                height: "80vh",
                display: "flex",

                alignItems: "center",
                justifyContent: "center",
                zIndex: 3000,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                overflowY: "auto",
                padding: "60px",
              }}
            >
              <EditProfileForm
     
                formValues={formValues}
                onInputChange={handleInputChange}
                onImageChange={handleImageChange}
                onAddImage={handleAddImageInput}
                onSubmit={handleFormSubmit}
                validationErrors={validationErrors}
                defaultBanner={defaultBanner}
                defaultAvatar={defaultAvatar}
           setIsEditProfileVisible={setIsEditProfileVisible}
           isEditProfileVisible={isEditProfileVisible}
           setValue = {setValue}
      
    

              />
            </div>
          )}
        </Box>
      )}
    </>
  );
};

export default EditProfileFormBox;
