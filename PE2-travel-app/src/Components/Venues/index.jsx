import React, { useEffect, useState } from "react";
import CreateVenueFormBox from "../CreateVenueFormBox";
import Wifi from '../../assets/Images/wifi.png';
import Parking from '../../assets/Images/parking.png';
import Pets from '../../assets/Images/pets.png';
import Breakfast from '../../assets/Images/breakfast.png';
import{Snackbar, Alert} from '@mui/material';


function Venues({vmVenues, successMessage, setSuccessMessage}) {

const facilityIcons = {
  wifi: Wifi,
  parking: Parking,
  pets: Pets,
  breakfast: Breakfast,
};

const [isFormVisible, setIsFormVisible] = useState(false);


const toggleForm = ()=>{
    setIsFormVisible((prevVisible)=> !prevVisible);
};


  return (
    <div>
      <h1>Venues</h1>

      <div
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
  }}
>

      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        sx={{
        
display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1500,
          width: '400px',
            height: "auto",
            backgroundColor: "transparent",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          
        }}
      >
        <Alert
          severity="success"
          onClose={() => setSuccessMessage(false)}
          sx={{
            fontSize: "20px",
            padding: "20px",
          
            textAlign: "center",
          }}
        >
          Venue created successfully!
        </Alert>
      </Snackbar>
      </div>

      <button onClick={toggleForm}>Create Venue</button>
      {isFormVisible && (
        <div
          style={{
            position: "fixed",
            width: "80vw",
            height: "80vh",
            display: "flex",

            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "auto",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "red",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          ></div>
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={toggleForm}
          >
            Close
          </button>
          <CreateVenueFormBox
            toggleForm={toggleForm}
            setSuccessMessage={setSuccessMessage}
          />
        </div>
      )}

      {Array.isArray(vmVenues) && vmVenues.length > 0 ? (
        vmVenues.map((venue) => (
          <div key={venue.id}>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
            <p>Location: {venue.location?.city || "Unknown"}</p>
            <p>Price: {venue.price || "N/A"}</p>
            {venue.media.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`${selectedStay.name} image ${index + 1}`}
                loading="lazy"
              />
            ))}

            <h2>Available Facilities</h2>
            {venue.meta ? (
              <ul>
                {Object.entries(venue.meta)
                  .filter(([key, value]) => value === true)
                  .map(([facility]) => (
                    <li key={facility}>
                      <img
                        src={facilityIcons[facility]}
                        alt={`${facility} icon`}
                      />
                      {facility.charAt(0).toUpperCase() + facility.slice(1)}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No Facilities Available</p>
            )}
          </div>
        ))
      ) : (
        <p>No venues available.</p>
      )}
    </div>
  );
}

export default Venues;