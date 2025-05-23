import { Box, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateVenueFormValidator from "../CreateVenueFormValidator";
import useMyStore from "../../Store/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import fetchStays from "../../API/FetchStays";
import createVenueStyles from "../../CSS_Modules/CreateVenue/createVenue.module.css";

const CreateVenueForm = ({ toggleForm }) => {
  const { createNewVenue, setSuccessMessage } = useMyStore();
  const [stays, setStays] = useState([]);



  // State to manage the meta values

  const [metaValues, setMetaValues] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  // CREATE VENUE FUNCTION

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: { lat: 0, lng: 0 },
    },
    resolver: yupResolver(CreateVenueFormValidator),
    mode: "onSubmit",
  });

  const onSubmit = async (formValues) => {
    const venueData = {
      ...formValues,
      price: Number(formValues.price),
      maxGuests: Number(formValues.maxGuests),
      rating: Number(formValues.rating),
      location: {
        ...formValues.location,
        lat: Number(formValues.location.lat),
        lng: Number(formValues.location.lng),
        zip: String(formValues.location.zip).trim(),
      },
    };

    try {
    await createNewVenue(venueData);
   
const fetchedStays = await fetchStays();

      setStays(fetchedStays);
      console.log("Fetched stays in create new venue:", fetchedStays);
    

      setTimeout(() => {
      
        toggleForm();
        setSuccessMessage("Venue created successfully!");
      }, 500);
    } catch (error) {
      console.error("Error creating venue:", error);
      setError("api", { message: "Failed to create venue" });
    }
  };

  // UseEffect to check for changes in the meta values and update the state

  useEffect(() => {
    const meta = watch("meta") || {};
    setMetaValues({
      wifi: meta.wifi || false,
      parking: meta.parking || false,
      breakfast: meta.breakfast || false,
      pets: meta.pets || false,
    });
  }, [watch("meta")]);

  // Add Image 

  const onAddImage = () => {
    const currentMedia = watch("media") || [];

    const updatedMedia = [...currentMedia, { url: "", alt: "" }];
    setValue("media", updatedMedia);
  };

  //Remove Image
  

  const removeImage = (index) => {
    const updatedMedia = [...watch("media")];
    updatedMedia.splice(index, 1);
    setValue("media", updatedMedia);
  };

  return (
    <div className={createVenueStyles.createVenueFormDiv}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          marginBottom: 2,
          width: "800px",
          height: "100px",
          padding: 3,
          backgroundColor: "white",
        }}
      >
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <TextField
          label="Name"
          {...register("name")}
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: 2 }}
          autoComplete="name"
        />

        {errors.description && (
          <p style={{ color: "red" }}>{errors.description.message}</p>
        )}
        <TextField
          label="Description"
          {...register("description")}
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        {Array.isArray(watch("media")) &&
          watch("media").map((image, index) => (
            <Box key={index}>
              <TextField
                label="Image URL"
                {...register(`media.${index}.url`)}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 1 }}
              />
              {errors.media?.[index]?.url && (
                <p style={{ color: "red" }}>
                  {errors.media[index].url.message}
                </p>
              )}

              <TextField
                label="Alt Text"
                {...register(`media.${index}.alt`)}
                variant="outlined"
                fullWidth
              />
              {errors.media?.[index]?.alt && (
                <p style={{ color: "red" }}>
                  {errors.media[index].alt.message}
                </p>
              )}

              <Button type="button" onClick={() => removeImage(index)}>
                Remove Image
              </Button>
            </Box>
          ))}
        <Button type="button" onClick={onAddImage}>
          Add Image
        </Button>

        <TextField
          label="Price"
          type="number"
          {...register("price")}
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}

        <TextField
          label="Max Guests"
          type="number"
          {...register("maxGuests")}
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        {errors.maxGuests && (
          <p style={{ color: "red" }}>{errors.maxGuests.message}</p>
        )}

        <TextField
          label="Rating"
          type="number"
          {...register("rating")}
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        {errors.rating && (
          <p style={{ color: "red" }}>{errors.rating.message}</p>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Button
            variant={metaValues.parking ? "contained" : "outlined"}
           onClick={() => {
  setValue("meta", { ...metaValues, parking: !metaValues.parking });
}}

          >
            Parking
          </Button>

          <Button
            variant={metaValues.wifi ? "contained" : "outlined"}
          onClick={() => {
  setValue("meta", { ...metaValues, wifi: !metaValues.wifi});
}}

          >
            Wifi
          </Button>

          <Button
            variant={metaValues.breakfast ? "contained" : "outlined"}
            onClick={() => {
  setValue("meta", { ...metaValues, breakfast: !metaValues.breakfast });
}}

          >
            Breakfast
          </Button>

          <Button
            variant={metaValues.pets ? "contained" : "outlined"}
          onClick={() => {
  setValue("meta", { ...metaValues, pets: !metaValues.pets });
}}

          >
            Pets
          </Button>
        </Box>

        <TextField
          label="Address"
          {...register("location.address")}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {errors.location?.address && (
          <p style={{ color: "red" }}>{errors.location.address.message}</p>
        )}

        <TextField
          label="City"
          {...register("location.city")}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {errors.location?.city && (
          <p style={{ color: "red" }}>{errors.location.city.message}</p>
        )}

        <TextField
          label="Zip"
          {...register("location.zip", { valueAsString: true })}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {errors.location?.zip && (
          <p style={{ color: "red" }}>{errors.location.zip.message}</p>
        )}

        <TextField
          label="Country"
          {...register("location.country")}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {errors.location?.country && (
          <p style={{ color: "red" }}>{errors.location.country.message}</p>
        )}

        <TextField
          label="Continent"
          {...register("location.continent")}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {errors.location?.continent && (
          <p style={{ color: "red" }}>{errors.location.continent.message}</p>
        )}

        <TextField
          label="Latitude"
          type="number"
          {...register("location.lat")}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {errors.location?.lat && (
          <p style={{ color: "red" }}>{errors.location.lat.message}</p>
        )}

        <TextField
          label="Longitude"
          type="number"
          {...register("location.lng")}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {errors.location?.lng && (
          <p style={{ color: "red" }}>{errors.location.lng.message}</p>
        )}

        <button type="submit" style={{ width: "100%" }}>
          Create Venue
        </button>

        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          onClick={toggleForm}
          sx={{ marginTop: 2 }}
        >
          CANCEL
        </Button>
      </Box>
    </form>
    </div>
  );
};

export default CreateVenueForm;
