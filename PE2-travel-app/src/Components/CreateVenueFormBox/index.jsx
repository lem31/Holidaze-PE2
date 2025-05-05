import React, { useState, useEffect } from "react";
import { Box, Typography} from "@mui/material";
import CreateVenueForm from "../CreateVenueForm";
import createVenue from '../../API/CreateVenue';
import CreateVenueFormValidator from '../CreateVenueFormValidator';
import fetchVMVenues from "../../API/FetchVMVenues";


const CreateVenueFormBox = ({toggleForm, setSuccessMessage}) => {
 const API_URL = "https://v2.api.noroff.dev/holidaze/venues";
 const [validationErrors, setValidationErrors] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
description: "",
    images: [{ url: "", alt: "" }],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",  
  city: "",
  zip: "",
  country: "",
  continent: "",
  lat: 0,
  lng: 0,
    },

  });

  useEffect(() => {
    console.log("Validation Errors:", validationErrors);
  }, [validationErrors]);
  
 

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => {

      if (name.startsWith('meta.')){
        const metaKey = name.split('.')[1];
        return {
      ...prevValues,
      meta: {
        ...prevValues.meta, 
        [metaKey]: value, 
      },
    };
  } else {
  return {
    ...prevValues,[name]: name === "price" || name === "maxGuests" || name === "rating" ? (value ? parseInt(value, 10) : "") : value,
  }}
    })

    
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

      
    if(!event) return;
    event.preventDefault();
    try{
   await CreateVenueFormValidator.validate(formValues, {abortEarly: false});
  setValidationErrors({});

  const venueData = {
    name: formValues.name.trim(), 
    description: formValues.description.trim(),
    media: formValues.images
    .filter((image) => image.url.trim() !== "" && isValidUrl(image.url.trim())) 
    .map((image) => ({
      url: image.url.trim(),
      alt: image.alt.trim() || "Default alt text", 
    })),
    price: parseInt(formValues.price, 10), 
    maxGuests: parseInt(formValues.maxGuests, 10), 
    rating: formValues.rating || 0, 
    meta: {
      wifi: formValues.meta.wifi,
      parking: formValues.meta.parking,
      breakfast: formValues.meta.breakfast,
      pets: formValues.meta.pets,
    },
    location: {
        address: formValues.location.address || "",
        city: formValues.location.city || "",
        zip: formValues.location.zip || "",
        country: formValues.location.country || "",
        continent: formValues.location.continent || "",
        lat: formValues.location.lat || 0,
        lng: formValues.location.lng || 0,
      },
  };

    const response = await createVenue(API_URL, venueData);
    console.log("Venue successfully created:", response);
setSuccessMessage('Venue created successfully!');
fetchVMVenues();
    console.log('API RESPONSE:', response);
    } catch (error) {
      const errors = {};
      if (error.inner) {
      error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
      }
      setValidationErrors(errors);
    }
  };
  
  
  return (
    <Box>
    

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Create Venue
        </Typography>
        <CreateVenueForm
          formValues={formValues}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onAddImage={handleAddImageInput}
          onSubmit={handleFormSubmit}
          validationErrors={validationErrors}
          toggleForm = {toggleForm}
        />
      </Box>

   
    </Box>
  );
};

export default CreateVenueFormBox;
