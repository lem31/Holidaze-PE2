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



  const defaultBanner = {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Default Banner",
  };
  const defaultAvatar = {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Default Avatar",
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
                validationErrors={validationErrors}
                defaultBanner={defaultBanner}
                defaultAvatar={defaultAvatar}
           setIsEditProfileVisible={setIsEditProfileVisible}
           isEditProfileVisible={isEditProfileVisible}
           setValue = {setValue}
           setValidationErrors={setValidationErrors}

        
      
    

              />
            </div>
          )}
        </Box>
      )}
    </>
  );
};

export default EditProfileFormBox;
