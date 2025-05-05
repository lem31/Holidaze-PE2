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
    onSubmit,
    defaultBanner,
    defaultAvatar,
    validationErrors = {},
}) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
            }}
        >
            <TextField
                label="Name"
                name="name"
                value={formValues.name}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                variant="outlined"
                fullWidth
                required
                sx={{ marginBottom: 2 }}
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
                sx={{ marginBottom: 2 }}
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
                sx={{ marginBottom: 2 }}
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
                sx={{ marginBottom: 2 }}
            />
            {validationErrors.bio && <p>{validationErrors.bio}</p>}
            <Box sx={{ marginBottom: 2 }}>
              {validationErrors.bannerUrl && <p>{validationErrors.bannerUrl}</p>}
                   <TextField
                     label="Banner Alt Text"
                     name="bannerAlt"
                     value={formValues.bannerAlt || defaultBanner.alt}
                     onChange={(e) => onInputChange(e.target.name, e.target.value)}
                     variant="outlined"
                     fullWidth
                   />
                   {validationErrors.bannerAlt && <p>{validationErrors.banner.alt}</p>}
                 </Box>
                 <Box sx={{ marginBottom: 2 }}>
                   <TextField
                     label="Avatar Image URL"
                     name="avatarUrl"
                     value={formValues.avatarUrl || defaultAvatar.url}
                     onChange={(e) => onInputChange(e.target.name, e.target.value)}
                     variant="outlined"
                     fullWidth
                     sx={{ marginBottom: 1 }}
                   />
                   {validationErrors.avatarUrl && <p>{validationErrors.avatar.url}</p>}
                   <TextField
                     label="Avatar Alt Text"
                     name="avatarAlt"
                     value={formValues.avatar.alt}
                     onChange={(e) => onInputChange(e.target.name, e.target.value)}
                     variant="outlined"
                     fullWidth
                   />
                   {validationErrors.avatarAlt && <p>{validationErrors.avatar.alt}</p>}
                <TextField
                    label="Avatar Alt Text"
                    name="avatarAlt"
                    value={formValues.avatarAlt}
                    onChange={(e) => onInputChange(e.target.name, e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                {validationErrors.avatarAlt && <p>{validationErrors.avatarAlt}</p>}
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Changes
            </Button>
        </form>
    );
};

export default EditProfileForm;