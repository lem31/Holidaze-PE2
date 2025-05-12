import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import EditProfileForm from "../EditProfileForm";
import EditProfileFormValidator from "../EditProfileFormValidator";
import useMyStore from "../../Store";

const EditProfileFormBox = ({
  toggleForm,
  setSuccessMessage,
  isEditProfileVisible,
  setIsEditProfileVisible,
}) => {
  const [validationErrors, setValidationErrors] = useState({});

  const { userProfile, updateUserProfile } = useMyStore();

  const defaultBanner = {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Default Banner",
  };
  const defaultAvatar = {
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    alt: "Default Avatar",
  };

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    banner: {url: '', alt: ''},
    avatar: {url: '', alt: ''},
    venueManager: true,
  });

  useEffect(() => {
    if (userProfile && userProfile.data) {
      setFormValues({
        name: userProfile.data.name || "",
        email: userProfile.data.email || "",
        password: "",
        bio: userProfile.data.bio || "",
        banner: {
          url: userProfile.data.banner?.url || defaultBanner.url,
          alt: userProfile.data.banner?.alt || defaultBanner.alt,
        },
        avatar: {
          url: userProfile.data.avatar?.url || defaultAvatar.url,
          alt: userProfile.data.avatar?.alt || defaultAvatar.alt,
        },
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

  const handleImageChange = ( name, property, value) => {
   
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: {...prevValues[name], [property]: value||""}, 
    }));
  };

  const handleAddImageInput = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      images: [...prevValues.images, { url: "", alt: "" }],
    }));
  };

  const handleFormSubmit = async (event) => {
    if (!event) return;
    event.preventDefault();

    const updatedFormValues = {
      ...formValues,
      banner: {
        url: formValues.banner.url?.trim() || defaultBanner.url,
        alt: formValues.banner.alt?.trim() || defaultBanner.alt,
      },
      avatar: {
        url: formValues.avatar.url?.trim() || defaultAvatar.url,
        alt: formValues.avatar.alt?.trim() || defaultAvatar.alt,
      },
    };

    const userData = updatedFormValues;
    try {
      await EditProfileFormValidator.validate(updatedFormValues, {
        abortEarly: false,
      });
      setValidationErrors({});
      const success = await updateUserProfile(userData);
      if (success) {
        setSuccessMessage("Profile Updated successfully!");
        setTimeout(() => {
          toggleForm();
        }, 500);
      } else {
        console.error("Failed to update profile");
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
                formValues={userProfile.data}
                onInputChange={handleInputChange}
                onImageChange={handleImageChange}
                onAddImage={handleAddImageInput}
                onSubmit={handleFormSubmit}
                validationErrors={validationErrors}
                defaultBanner={defaultBanner}
                defaultAvatar={defaultAvatar}
           setIsEditProfileVisible={setIsEditProfileVisible}
           isEditProfileVisible={isEditProfileVisible}

              />
            </div>
          )}
        </Box>
      )}
    </>
  );
};

export default EditProfileFormBox;
