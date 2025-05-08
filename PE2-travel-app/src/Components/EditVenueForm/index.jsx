import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useMyStore from "../../Store";
import CreateVenueFormValidator  from "../CreateVenueFormValidator";
import { Box, Button, TextField } from "@mui/material";



function EditVenueForm({toggleEditForm}) {

    const { fetchVMVenues, editVenue, setSuccessMessage } = useMyStore();

console.log("🔍 Selected Venue in EditVenueForm:", selectedVenue);

const { selectedVenue, setSelectedVenue } = useMyStore();
 

    const toggleFacility = (facility) => {
        const currentMeta = watch('meta') || {};
        setValue("meta", { ...currentMeta, [facility]: !currentMeta[facility] });
      };
      
  
    const [metaValues, setMetaValues] = useState({
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    });
    const {
      register,
      handleSubmit,
      setValue,
      watch,
  
      setError,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(CreateVenueFormValidator),
      mode: "onSubmit",
  
     
    });
  
   
    const onSubmit = async (formValues) => {
      console.log(" handleSubmit is executing!");
      console.log("🚀 Form submission triggered!", formValues);
      const updatedVenueData = {
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
  
      const selectedVenueID = selectedVenue.id;
  
      try {
        console.log("📝 venueData before submission:", updatedVenueData);
       
  console.log ("🔍 Selected Venue ID:", selectedVenueID);
        const response = await editVenue(selectedVenueID, updatedVenueData);
  
        console.log("API response:", response);
        fetchVMVenues();
        setTimeout(() => {
          toggleEditForm();
          setSuccessMessage("Venue successfully updated!");
        }, 500);
      } catch (error) {
        console.error("Error creating venue:", error);
        setError("api", { message: "Failed to create venue" });
      }
    };
  
    useEffect(() => {
      const meta = watch("meta") || {};
      setMetaValues({
        wifi: meta.wifi || false,
        parking: meta.parking || false,
        breakfast: meta.breakfast || false,
        pets: meta.pets || false,
      });
    }, [watch("meta")]);
  
    const onAddImage = () => {
      const currentMedia = watch("media") || [];
      console.log("🔍 Current media before adding:", currentMedia);
  
      const updatedMedia = [...currentMedia, { url: "", alt: "" }];
      setValue("media", updatedMedia);
  

    };
  
    const removeImage = (index) => {
      const updatedMedia = [...watch("media")];
      updatedMedia.splice(index, 1);
      setValue("media", updatedMedia);
    };
  
    useEffect(() => {
        if (selectedVenue) {
          setValue("name", selectedVenue.name);
          setValue("description", selectedVenue.description);
          setValue("price", selectedVenue.price);
          setValue("maxGuests", selectedVenue.maxGuests);
          setValue("rating", selectedVenue.rating);
      setValue("location.address", selectedVenue.location?.address || "");
      setValue("location.city", selectedVenue.location?.city || "");
      setValue("location.zip", selectedVenue.location?.zip || "");
      setValue("location.country", selectedVenue.location?.country || "");
      setValue("location.continent", selectedVenue.location?.continent || "");
      setValue("location.lat", selectedVenue.location?.lat || "");
      setValue("location.lng", selectedVenue.location?.lng || "");
          setValue("location.address", selectedVenue.location?.address || "");
          setValue("location.city", selectedVenue.location?.city || "");
          setValue("location.zip", selectedVenue.location?.zip || "");
          setValue("location.country", selectedVenue.location?.country || "");
          setValue("location.continent", selectedVenue.location?.continent || "");
          setValue("location.lat", selectedVenue.location?.lat || "");
          setValue("location.lng", selectedVenue.location?.lng || "");
      
          setValue("media", selectedVenue.media || []);
          setValue("meta.parking", selectedVenue.meta?.parking || false);
          setValue("meta.wifi", selectedVenue.meta?.wifi || false);
          setValue("meta.breakfast", selectedVenue.meta?.breakfast || false);
          setValue("meta.pets", selectedVenue.meta?.pets || false);
        }
      }, [selectedVenue, setValue]);
      
  

    return(
        <form onSubmit={handleSubmit(onSubmit) }>
        <Box
          sx={{
            marginBottom: 2,
            width: "800px",
            height: "100px",
            padding: 3,
            backgroundColor: "white",
            zIndex: 2000,
            position: "relative",
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
                  <p style={{ color: "red" }}>{errors.media[index].url.message}</p>
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
              onClick={() => toggleFacility("parking")}
            >
              Parking
            </Button>
  
            <Button
              variant={metaValues.wifi ? "contained" : "outlined"}
              onClick={() => toggleFacility("wifi")}
            >
              Wifi
            </Button>
  
            <Button
              variant={metaValues.breakfast ? "contained" : "outlined"}
              onClick={() => toggleFacility("breakfast")}
            >
              Breakfast
            </Button>
  
            <Button
              variant={metaValues.pets ? "contained" : "outlined"}
              onClick={() => toggleFacility("pets")}
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
  
          <Button type="submit" style={{ width: "100%" }}>
           Save Venue
          </Button>
  
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            onClick={toggleEditForm}
            sx={{ marginTop: 2 }}
          >
            CANCEL
          </Button>
        </Box>
      </form>
    )
}

export default EditVenueForm;