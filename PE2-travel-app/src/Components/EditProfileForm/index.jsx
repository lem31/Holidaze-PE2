import React from "react";
import { Box, TextField, Button } from "@mui/material";

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
  formValues,
  onInputChange,
  onImageChange,
  onSubmit,
  validationErrors = {},
  setIsEditProfileVisible,
  isEditProfileVisible,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
     
    
  
      <TextField
        label="Bio"
        name="bio"
        value={formValues?.bio || ""}
        onChange={(e) => onInputChange(e.target.name, e.target.value)}
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        sx={{ marginBottom: 2 }}
      />
      {validationErrors.bio && <p>{validationErrors.bio}</p>}

      <Box sx={{ marginBottom: 2 }}>
       
        <TextField
          label="Banner URL"
          name="bannerUrl"
          value={formValues?.banner?.url || ''}
          onChange={(e) => onImageChange('banner', 'url', e.target.value)}
          variant="outlined"
          fullWidth
        />
        {validationErrors.bannerUrl && <p>{validationErrors.banner.url}</p>}
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        {validationErrors.bannerUrl && <p>{validationErrors.bannerUrl}</p>}
        <TextField
          label="Banner Alt Text"
          name="bannerAlt"
          value={formValues?.banner?.alt || ''}
          onChange={(e) => onImageChange( 'banner', 'alt', e.target.value)}
          variant="outlined"
          fullWidth
        />
        {validationErrors.bannerAlt && <p>{validationErrors.banner.alt}</p>}
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Avatar URL"
          name="avatarUrl"
          value={formValues?.avatar?.url || ''}
          onChange={(e) => onImageChange('avatar', 'url',  e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 1 }}
        />
        {validationErrors.avatarUrl && <p>{validationErrors.avatar.url}</p>}
        <TextField
          label="Avatar Alt Text"
          name="avatarAlt"
          value={formValues?.avatar?.alt || ''}
          onChange={(e) => onImageChange( 'avatar', 'alt', e.target.value)}
          variant="outlined"
          fullWidth
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
