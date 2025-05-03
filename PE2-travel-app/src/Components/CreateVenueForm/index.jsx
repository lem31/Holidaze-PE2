import Pets from '../../assets/Images/Pets.png';
import Breakfast from '../../assets/Images/Breakfast.png';
import Parking from '../../assets/Images/Parking.png';
import Wifi from '../../assets/Images/Wifi.png';
import React, {useEffect, useState} from 'react';
import { Box, TextField, Button, } from "@mui/material";



const CreateVenueForm = ({ toggleForm, formValues, onInputChange, onImageChange, onAddImage, onSubmit, validationErrors = {} }) => {

 
  useEffect(() => {
    console.log("Updated Facilities State:", formValues.meta);
  }, [formValues.meta]);
  
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
          toggleForm();
          console.log('Form submitted with values:', formValues);
        
        }}
      >

        <Box sx={{ marginBottom: 2, width: '100%', maxWidth: '600px', height: 'auto', maxHeight:'70vh', padding:3, backgroundColor:'white'}}>
        <TextField
          label="Name"
          name="name"
          value={formValues.name}
          onChange={(e) =>onInputChange(e.target.name, e.target.value)}
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
          {validationErrors.name && <p>{validationErrors.name}</p>}
    

        <TextField
          label="Description"
          name="description"
          value={formValues.description}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: 2 }}
        />
          {validationErrors.description && <p>{validationErrors.description}</p>}
      
     
        {Array.isArray(formValues.images) && formValues.images.map((image, index) => (
          <Box key={index} >
            <TextField
              label="Image URL"
              name="url"
              value={image.url}
              onChange={(e) => onImageChange(index, e.target.name, e.target.value)}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 1 }}
            />
              {validationErrors.url && <p>{validationErrors.url}</p>}
            <TextField
              label="Alt Text"
              name="alt"
              value={image.alt}
              onChange={(e) => onImageChange(index, e.target.name, e.target.value)}
              variant="outlined"
              fullWidth
            />
              {validationErrors.alt && <p>{validationErrors.alt}</p>}
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


   <TextField
          label="price"
          name="price"
            type='number'
          value={formValues.price}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: 2 }}
        />
          {validationErrors.price && <p>{validationErrors.price}</p>}
          <TextField
          label="maxGuests"
          name="maxGuests"
          type='number'
          value={formValues.maxGuests}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: 2 }}
        />
          {validationErrors.maxGuests && <p>{validationErrors.maxGuests}</p>}
          <TextField
          label="Rating"
          name="rating"
          value={formValues.rating}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: 2 }}
        />
          {validationErrors.rating && <p>{validationErrors.rating}</p>}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Button
      
            variant={formValues.meta.parking ? "contained" : "outlined"}
            onClick={() => onInputChange("meta.parking", !formValues.meta.parking)}
            startIcon={<img src={Parking} alt="Parking" style={{ width: 24, height: 24 }} />}
        >
              <img src={Parking} alt="Parking" />
            Parking
        </Button>
        <Button
            variant={formValues.meta.wifi ? "contained" : "outlined"}
            onClick={() => onInputChange("meta.wifi", !formValues.meta.wifi)}
            startIcon={<img src={Wifi} alt="Wifi" style={{ width: 24, height: 24 }} />}
        >
              <img src={Wifi} alt="Wifi" />
            Wifi
        </Button>
        <Button
            variant={formValues.meta.breakfast ? "contained" : "outlined"}
            onClick={() => onInputChange("meta.breakfast", !formValues.meta.breakfast)}
            startIcon={<img src={Breakfast} alt="Breakfast" style={{ width: 24, height: 24 }} />}
        >
              <img src={Breakfast} alt="Breakfast" />
            Breakfast
        </Button>
        <Button
            variant={formValues.meta.pets ? "contained" : "outlined"}
            onClick={() => onInputChange("meta.pets", !formValues.meta.pets)}
            startIcon={<img src={Pets} alt="Pets" style={{ width: 24, height: 24 }} />}
        >
              <img src={Pets} alt="Pets" />
            Pets
        </Button>
    </Box>
    <Box sx={{ marginBottom: 2 }}>
        <TextField
            label="Address"
            name="location.address"
            value={formValues.location?.address || ''}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
        />
        {validationErrors['location.address'] && <p>{validationErrors['location.address']}</p>}

        <TextField
            label="City"
            name="location.city"
            value={formValues.location?.city || ''}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
        />
        {validationErrors['location.city'] && <p>{validationErrors['location.city']}</p>}

        <TextField
            label="Zip"
            name="location.zip"
            value={formValues.location?.zip || ''}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
        />
        {validationErrors['location.zip'] && <p>{validationErrors['location.zip']}</p>}

        <TextField
            label="Country"
            name="location.country"
            value={formValues.location?.country || ''}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
        />
        {validationErrors['location.country'] && <p>{validationErrors['location.country']}</p>}

        <TextField
            label="Continent"
            name="location.continent"
            value={formValues.location?.continent || ''}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
        />
        {validationErrors['location.continent'] && <p>{validationErrors['location.continent']}</p>}

        <TextField
            label="Latitude"
            name="location.lat"
            type="number"
            value={formValues.location?.lat || 0}
            onChange={(e) => onInputChange(e.target.name, parseFloat(e.target.value))}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
        />
        {validationErrors['location.lat'] && <p>{validationErrors['location.lat']}</p>}

        <TextField
            label="Longitude"
            name="location.lng"
            type="number"
            value={formValues.location?.lng || 0}
            onChange={(e) => onInputChange(e.target.name, parseFloat(e.target.value))}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
        />
        {validationErrors['location.lng'] && <p>{validationErrors['location.lng']}</p>}
    </Box>

    <Button type="submit" variant="contained" color="primary" fullWidth>
     Create Venue
        </Button>
    
        <Button type='button' variant="contained" color="primary" fullWidth onClick={toggleForm} style={{ marginTop: 10 }} >CANCEL</Button>
      
        </Box>
      </form>
    );
  };
  
  export default CreateVenueForm;
  