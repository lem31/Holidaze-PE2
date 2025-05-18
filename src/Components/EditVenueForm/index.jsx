import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useMyStore from "../../Store";
import CreateVenueFormValidator from "../CreateVenueFormValidator";
import { Box, Button, TextField } from "@mui/material";

function EditVenueForm({ toggleEditForm }) {
  const { editVenue, setSuccessMessage, selectedVenue, fetchVMVenues } =
    useMyStore();

  const [metaValues, setMetaValues] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });

  const toggleFacility = (facility) => {
    setMetaValues((prev) => {
      const updatedMeta = { ...prev, [facility]: !prev[facility] };
      setValue(`meta.${facility}`, updatedMeta[facility]);
      return updatedMeta;
    });
  };

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

  useEffect(() => {
    if (selectedVenue?.meta) {
      setMetaValues({
        parking: selectedVenue.meta.parking ?? false,
        wifi: selectedVenue.meta.wifi ?? false,
        breakfast: selectedVenue.meta.breakfast ?? false,
        pets: selectedVenue.meta.pets ?? false,
      });

      setValue("meta", selectedVenue.meta);
    }
  }, [selectedVenue, setValue]);

  const onAddImage = () => {
    const currentMedia = watch("media") || [];
    setValue("media", [...currentMedia, { url: "", alt: "" }]);
  };

  const removeImage = (index) => {
    const updatedMedia = [...watch("media")];
    updatedMedia.splice(index, 1);
    setValue("media", updatedMedia);
  };

  useEffect(() => {
    if (selectedVenue) {
      const meta = selectedVenue.meta || {};
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
      setValue("media", selectedVenue.media || []);
      setValue("meta.parking", meta.parking ?? false);
      setValue("meta.wifi", meta.wifi ?? false);
      setValue("meta.breakfast", meta.breakfast ?? false);
      setValue("meta.pets", meta.pets ?? false);
    }
  }, [selectedVenue, setValue]);

  const onSubmit = async (formValues) => {
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
        ...formValues,
      },

      meta: metaValues,
    };

    try {
      const response = await editVenue(updatedVenueData);

      if (!response) {
        throw new Error("Venue update failed");
      } else if (response) {
        fetchVMVenues();
        setTimeout(() => {
          toggleEditForm();
          setSuccessMessage("Venue successfully updated!");
        }, 500);
      }
    } catch (error) {
      console.error("Error creating venue:", error);
      setError("api", { message: "Failed to create venue" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit" style={{ width: "100%", padding: "40px" }}>
          Save Venue
        </button>

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
  );
}

export default EditVenueForm;
