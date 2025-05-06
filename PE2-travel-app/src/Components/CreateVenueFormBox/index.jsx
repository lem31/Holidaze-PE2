import React from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CreateVenueForm from '../CreateVenueForm';
import CreateVenueFormValidator from "../CreateVenueFormValidator";
import createVenue from "../../API/CreateVenue";

const CreateVenueFormBox = ({
  setSuccessMessage,
  toggleForm,
  fetchVMVenues,
}) => {
  const API_URL = "https://v2.api.noroff.dev/holidaze/venues";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateVenueFormValidator),
    mode: 'onSubmit',
    defaultValues: {
      name: "",
      description: "",
      price: "",
      location: {
        address: "",
        city: "",
        country: "",
      },
      media: [],
      meta: { wifi: false, parking: false, breakfast: false, pets: false },
    },
  });

  const onAddImage = () => {
    setValue("media", [...watch("media"), { url: "", alt: "" }]);
  };

  const removeImage = (index) => {
    const updatedMedia = [...watch("media")];
    updatedMedia.splice(index, 1);
    setValue("media", updatedMedia);
  };



  const onSubmit = async (formData) => {
    console.log("Submitting form...", formData);
    console.log("Current validation errors:", errors);
  
    try {
      const response = await createVenue(API_URL, formData);
      console.log("Venue created successfully:", response);
  
      if (!response || response.error) {
        throw new Error("Venue creation failed");
      }
  
      setSuccessMessage("Venue created successfully!");
      await fetchVMVenues();
      reset();
      toggleForm();
      console.log("Current errors:", errors);
    } catch (error) {
      console.error("Error creating venue:", error);
      setError("general", { type: "manual", message: "Failed to create venue" });
    }
  };
  

  return (
    <Box>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Create Venue
        </Typography>
        <CreateVenueForm
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setValue={setValue}
          watch={watch}
          onAddImage={onAddImage}
          removeImage={removeImage}
        />
      </Box>
    </Box>
  );}

  export default CreateVenueFormBox;
  