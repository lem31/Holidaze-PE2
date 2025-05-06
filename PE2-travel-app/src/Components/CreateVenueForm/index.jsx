import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";



const CreateVenueForm = ({ register, setValue, watch, errors, handleSubmit, onSubmit, toggleForm, onAddImage, removeImage }) => {
  const  [metaValues, setMetaValues]= useState({ wifi: false, parking: false, breakfast: false, pets: false });
  useEffect(() => {
    setMetaValues(watch("meta") || { wifi: false, parking: false, breakfast: false, pets: false });
  }, [watch("meta")]);



const handleFormSubmit = handleSubmit((data) =>{
  console.log("Form submitted with data:", data);
  onSubmit(data);
  toggleForm();
  reset();
  setMetaValues({ wifi: false, parking: false, breakfast: false, pets: false });
})

  return (
    <form onSubmit={handleFormSubmit}>
      <Box sx={{ marginBottom: 2, width: "800px", height: '100px', padding: 3, backgroundColor: "white" }}>

      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <TextField label="Name" {...register("name")} variant="outlined" fullWidth required sx={{ marginBottom: 2 }}   autoComplete="name" />
      
        {errors.description && <p style={{ color: "red" }}>{errors.description.message}</p>}
        <TextField label="Description" {...register("description")} variant="outlined" fullWidth required sx={{ marginBottom: 2 }} />
       

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
      {errors.media?.[index]?.url && <p style={{ color: "red" }}>{errors.media[index].url.message}</p>}

      <TextField
        label="Alt Text"
        {...register(`media.${index}.alt`)}
        variant="outlined"
        fullWidth
      />
      {errors.media?.[index]?.alt && <p style={{ color: "red" }}>{errors.media[index].alt.message}</p>}

      <Button type="button" onClick={() => removeImage(index)}>Remove Image</Button>
    </Box>
  ))}
<Button type="button" onClick={onAddImage}>Add Image</Button>

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
{errors.maxGuests && <p style={{ color: "red" }}>{errors.maxGuests.message}</p>}

<TextField
  label="Rating"
  type="number"
  {...register("rating")}
  variant="outlined"
  fullWidth
  required
  sx={{ marginBottom: 2 }}
/>
{errors.rating && <p style={{ color: "red" }}>{errors.rating.message}</p>}


        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <Button
            variant={metaValues.parking ? "contained" : "outlined"} 
            onClick={() => setValue("meta.parking", !metaValues.parking)} 
          >
            Parking
          </Button>

          <Button
            variant={metaValues.wifi ? "contained" : "outlined"}
            onClick={() => setValue("meta.wifi", !metaValues.wifi)}
          >
            Wifi
          </Button>

          <Button
            variant={metaValues.breakfast ? "contained" : "outlined"}
            onClick={() => setValue("meta.breakfast", !metaValues.breakfast)}
          >
            Breakfast
          </Button>

          <Button
            variant={metaValues.pets ? "contained" : "outlined"}
            onClick={() => setValue("meta.pets", !metaValues.pets)}
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
{errors.location?.address && <p style={{ color: "red" }}>{errors.location.address.message}</p>}

<TextField
  label="City"
  {...register("location.city")}
  variant="outlined"
  fullWidth
  sx={{ marginBottom: 2 }}
/>
{errors.location?.city && <p style={{ color: "red" }}>{errors.location.city.message}</p>}

<TextField
  label="Zip"
  {...register("location.zip")}
  variant="outlined"
  fullWidth
  sx={{ marginBottom: 2 }}
/>
{errors.location?.zip && <p style={{ color: "red" }}>{errors.location.zip.message}</p>}

<TextField
  label="Country"
  {...register("location.country")}
  variant="outlined"
  fullWidth
  sx={{ marginBottom: 2 }}
/>
{errors.location?.country && <p style={{ color: "red" }}>{errors.location.country.message}</p>}

<TextField
  label="Continent"
  {...register("location.continent")}
  variant="outlined"
  fullWidth
  sx={{ marginBottom: 2 }}
/>
{errors.location?.continent && <p style={{ color: "red" }}>{errors.location.continent.message}</p>}

<TextField
  label="Latitude"
  type="number"
  {...register("location.lat")}
  variant="outlined"
  fullWidth
  sx={{ marginBottom: 2 }}
/>
{errors.location?.lat && <p style={{ color: "red" }}>{errors.location.lat.message}</p>}

<TextField
  label="Longitude"
  type="number"
  {...register("location.lng")}
  variant="outlined"
  fullWidth
  sx={{ marginBottom: 2 }}
/>
{errors.location?.lng && <p style={{ color: "red" }}>{errors.location.lng.message}</p>}


        <Button  type="submit" variant="contained" color="primary" fullWidth>
          Create Venue
        </Button>
       
        <Button type="button" variant="contained" color="primary" fullWidth onClick={toggleForm} sx={{ marginTop: 2 }}>
          CANCEL
        </Button>
      </Box>
    </form>
  );
};

export default CreateVenueForm;
