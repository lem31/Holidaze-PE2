/**
 * EditProfileFormBox component displays a box containing the EditProfileForm.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.toggleForm - Function to toggle the form visibility
 * @param {Function} props.setSuccessMessage - Function to set a success message after profile update
 * @param {boolean} props.isEditProfileVisible - Controls the visibility of the edit profile modal
 * @param {Function} props.setIsEditProfileVisible - Function to set the visibility of the edit profile modal
 *
 * @returns {JSX.Element} The rendered EditProfileFormBox component
 */

import { Box, Typography } from "@mui/material";
import EditProfileForm from "../EditProfileForm";

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
        <Box sx={{ marginTop: 3 }}>
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
                setValue={setValue}
                setValidationErrors={setValidationErrors}
                setSuccessMessage={setSuccessMessage}
                toggleForm={toggleForm}
              />
            </div>
          )}
        </Box>
      )}
    </>
  );
};

export default EditProfileFormBox;
