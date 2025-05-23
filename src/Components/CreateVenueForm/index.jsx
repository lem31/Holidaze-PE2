import { Box, TextField, Button } from "@mui/material";
import  { useEffect, useState } from "react";
import CreateVenueFormValidator from "../CreateVenueFormValidator";
import useMyStore from "../../Store/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import fetchStays from "../../API/FetchStays";
import createVenueStyles from "../../CSS_Modules/CreateVenue/createVenue.module.css";
import gStyles from "../../CSS_Modules/Global/global.module.css";
import Parking from "../../Assets/Images/Parking.png";
import Wifi from "../../Assets/Images/Wifi.png";
import Breakfast from "../../Assets/Images/Breakfast.png";
import Pets from "../../Assets/Images/Pets.png";


const CreateVenueForm = ({ toggleForm}) => {
  const { createNewVenue, setSuccessMessage } = useMyStore();
  const [stays, setStays] = useState([]);







const toggleMeta =(key) => {
  setMetaValues((prevMeta)=> {
    const updatedMeta = { ...prevMeta, [key]: !prevMeta[key] };
    setValue("meta", updatedMeta);
    return updatedMeta;
  })
}

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

  return(
 

  
    
   <div className={createVenueStyles.overlay} onClick={toggleForm} >

    <div className={createVenueStyles.createVenueFormDiv}onClick={(e) => e.stopPropagation()}>
    
    <form className={createVenueStyles.createVenueForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={gStyles.h2White}>Create Venue</h2>
      <Box
       
      >
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <TextField
          label="Name"
          {...register("name")}
          variant="outlined"
          fullWidth
          required
    
          autoComplete="name"
          sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    },}}
        />

        {errors.description && (
          <p style={{ color: "red" }}>{errors.description.message}</p>
        )}
        <TextField
          label="Description"
          {...register("description")}
          variant="outlined"
          fullWidth
          autoComplete="description"
          required
          sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    },  marginTop:'12px',}}
        />

        {Array.isArray(watch("media")) &&
          watch("media").map((image, index) => (
            <Box key={index}>
              <TextField
                label="Image URL"
                {...register(`media.${index}.url`)}
                variant="outlined"
                autoComplete="image-url"
                fullWidth
              sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    },  marginTop:'12px',}}
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
                sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
     
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    }, marginTop:'12px',}}
              />
              {errors.media?.[index]?.alt && (
                <p style={{ color: "red" }}>
                  {errors.media[index].alt.message}
                </p>
              )}
<div className={createVenueStyles.removeBtnDiv}>
              <Button className={gStyles.buttonSecondary} type="button" onClick={() => removeImage(index)}>
                Remove Image
              </Button>
              </div>
            </Box>
          ))}
        <div className={createVenueStyles.addBtnDiv}>
        <Button className={gStyles.buttonPrimary} type="button" onClick={onAddImage}>
          Add Image
        </Button>
        </div>

        <TextField
          label="Price"
          type="number"
          {...register("price")}
          variant="outlined"
          fullWidth
          required
        sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    },
  marginTop:'12px',}}
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}

        <TextField
          label="Max Guests"
          type="number"
          {...register("maxGuests")}
          variant="outlined"
          fullWidth
          required
   sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    }, marginTop:'12px',}}
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
   sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    }, marginTop:'12px',}}
        />
        {errors.rating && (
          <p style={{ color: "red" }}>{errors.rating.message}</p>
        )}

        <Box
        className={createVenueStyles.metaBox}

        
        >
          <Button
          className={createVenueStyles.metaButton}
            variant={metaValues.parking ? "contained" : "outlined"}
           onClick={() => 
  toggleMeta("parking")
} sx={{backgroundColor: metaValues.parking ? "#e55299" : "rgb(233, 155, 174)",
  boxShadow: metaValues.parking ? "inset 0 0 40px #320e3b" : "none",
color: "white", 
fontSize: "14px",
fontFamily:"Lato",
}}


          >
            <img className={createVenueStyles.metaImg} src={Parking} alt="" />
            Parking
          </Button>

          <Button
           className={createVenueStyles.metaButton}
            variant={metaValues.wifi ? "contained" : "outlined"}
            onClick={() => 
  toggleMeta("wifi")
} sx={{backgroundColor: metaValues.wifi ? "#e55299" : "rgb(233, 155, 174)",
  boxShadow: metaValues.wifi ? "inset 0 0 40px #320e3b" : "none",
  color: "white", 
fontSize: "14px",
fontFamily:"Lato",

}}

          >
           < img className={createVenueStyles.metaImg} src={Wifi} alt="" />
            Wifi
          </Button>

          <Button
           className={createVenueStyles.metaButton}
            variant={metaValues.breakfast ? "contained" : "outlined"}
           onClick={() => 
  toggleMeta("breakfast")
} sx={{backgroundColor: metaValues.breakfast ? "#e55299" : "rgb(233, 155, 174)",
  boxShadow: metaValues.breakfast ? "inset 0 0 40px #320e3b" : "none",
  color: "white", 
fontSize: "14px",
fontFamily:"Lato",
"@media (max-width: 486px)": {
      fontSize: "12px",
    },}}


          >
            <img className={createVenueStyles.metaImg} src={Breakfast} alt="" />
            Breakfast
          </Button>

          <Button
            className={createVenueStyles.metaButton}
            variant={metaValues.pets ? "contained" : "outlined"}
          onClick={() => 
  toggleMeta("pets")
} sx={{backgroundColor: metaValues.pets ? "#e55299" : "rgb(233, 155, 174)",
  boxShadow: metaValues.pets ? "inset 0 0 40px #320e3b" : "none",
color: "white", 
fontSize: "14px",
fontFamily:"Lato",
}}
   >
            <img className={createVenueStyles.metaImg} src={Pets} alt="" />
            Pets
          </Button>
        </Box>

        <TextField
          label="Address"
          {...register("location.address")}
          variant="outlined"
          fullWidth
       sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    },marginTop:'12px',}}
        />
        {errors.location?.address && (
          <p style={{ color: "red" }}>{errors.location.address.message}</p>
        )}

        <TextField
          label="City"
          {...register("location.city")}
          variant="outlined"
          fullWidth
     sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    }, marginTop:'12px',}}
        />
        {errors.location?.city && (
          <p style={{ color: "red" }}>{errors.location.city.message}</p>
        )}

        <TextField
          label="Zip"
          {...register("location.zip", { valueAsString: true })}
          variant="outlined"
          fullWidth
        sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    }, marginTop:'12px',}}
        />
        {errors.location?.zip && (
          <p style={{ color: "red" }}>{errors.location.zip.message}</p>
        )}

        <TextField
          label="Country"
          {...register("location.country")}
          variant="outlined"
          fullWidth
        sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    }, marginTop:'12px',}}
        />
        {errors.location?.country && (
          <p style={{ color: "red" }}>{errors.location.country.message}</p>
        )}

        <TextField
          label="Continent"
          {...register("location.continent")}
          variant="outlined"
          fullWidth
        sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    }, marginTop:'12px',}}
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
         sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",
    },
    marginTop:'12px',
   }}
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
         sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      marginBottom: "16px",
    
    },
  "& .MuiInputLabel-root": {
      color: "white",
      fontFamily:"Lato",
      fontSize: "16px",
      marginTop: '-10px',
    },

    "& .MuiInputLabel-root.Mui-focused":{
      color: "#e56399",

    },  marginTop:'12px',}}
        />
        {errors.location?.lng && (
          <p style={{ color: "red" }}>{errors.location.lng.message}</p>
        )}

        <Button        className={gStyles.buttonPrimary} type="submit" style={{ width: "100%" }}>
          Create Venue
        </Button>

        <Button
        className={gStyles.buttonSecondary}
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
    </div>
 
  )

};

export default CreateVenueForm;
