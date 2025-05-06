import React, {useCallback} from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CreateVenueForm from '../CreateVenueForm';
import CreateVenueFormValidator from "../CreateVenueFormValidator";
import useMyStore from "../../Store/index";

const CreateVenueFormBox = ({
  setSuccessMessage,
  toggleForm,
  fetchVMVenues,
}) => {
 

  const { createVenue } = useMyStore();

  const memoizedCreateVenue = useCallback((data) => {
    createVenue(data);  
  }, [createVenue]);

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



  const onSubmit = async (data) => {
    console.log("🚀 Form submission triggered!", data);
   try{
     memoizedCreateVenue(data);
    setSuccessMessage("Venue created successfully!");
    reset();
    toggleForm();
   }catch (error) {
    console.error("Error creating venue:", error);
    setError("api", { message: "Failed to create venue" });
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
  