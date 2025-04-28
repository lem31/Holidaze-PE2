import React from "react";
import { Box, TextField, Button } from "@mui/material";

const RegisterForm = ({ formValues, onInputChange, onImageChange, onAddImage, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
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
      {formValues.images.map((image, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <TextField
            label="Image URL"
            name="url"
            value={image.url}
            onChange={(e) => onImageChange(index, e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 1 }}
          />
          <TextField
            label="Alt Text"
            name="alt"
            value={image.alt}
            onChange={(e) => onImageChange(index, e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Box>
      ))}
      <Button
        onClick={onAddImage}
        type="button"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        Add Another Image
      </Button>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default RegisterForm;
