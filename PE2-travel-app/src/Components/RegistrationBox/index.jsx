import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import RegisterForm from "../RegisterForm";
import onRegister from "../../API/OnRegister/index.js";

const RegisterBox = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    images: [{ url: "", alt: "" }],
    venueManager: true,
  });

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);

    setFormValues((prevValues) => ({
      ...prevValues,
      venueManager: newValue === 0,
    }));
  };

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (index, name, value) => {
    const updatedImages = [...formValues.images];
    updatedImages[index][name] = value;
    setFormValues((prevValues) => ({
      ...prevValues,
      images: updatedImages,
    }));
  };

  const handleAddImageInput = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      images: [...prevValues.images, { url: "", alt: "" }],
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await onRegister(API_URL, formValues);
      console.log("Registration successful:", response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Registration Tabs"
        centered
      >
        <Tab label="Venue Manager" />
        <Tab label="Customer" />
      </Tabs>

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {activeTab === 0
            ? "Register as a Venue Manager"
            : "Register as a Customer"}
        </Typography>
        <RegisterForm
          formValues={formValues}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onAddImage={handleAddImageInput}
          onSubmit={handleFormSubmit}
        />
      </Box>
    </Box>
  );
};

export default RegisterBox;
