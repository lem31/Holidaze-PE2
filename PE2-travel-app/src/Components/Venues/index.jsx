import React, { useEffect, useState } from "react";
import Wifi from "../../assets/Images/wifi.png";
import Parking from "../../assets/Images/parking.png";
import Pets from "../../assets/Images/pets.png";
import Breakfast from "../../assets/Images/breakfast.png";
import { Snackbar, Alert, Button, Dialog } from "@mui/material";
import useMyStore from "../../Store";
import CreateVenueForm from "../CreateVenueForm";
import EditVenueForm from "../EditVenueForm";
import SpecificVenueBookings from "../SpecificVenueBookings";




function Venues({ vmVenues}) {
  const facilityIcons = {
    wifi: Wifi,
    parking: Parking,
    pets: Pets,
    breakfast: Breakfast,
  };

  const {fetchVMVenues, successMessage, setSuccessMessage, selectedVenue, setSelectedVenue} = useMyStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isBookingsVisible, setIsBookingsVisible] = useState(false);


useEffect(() => {
  fetchVMVenues();
}, [fetchVMVenues]);

  

  useEffect(() => {
   

    fetchVMVenues();
  }, [successMessage]);




  const {deleteVenue} = useMyStore();

 

  const handleDelete =  (venueId) => {
    console.log("🔍 Venue ID before deletion:", venueId);
   
   const success = deleteVenue(venueId);
   console.log('Delete success:', success);
   if(success){
    setSuccessMessage('Venue deleted successfully!');
   } else {
    console.error('Failed to delete venue');
   }
  };



  const toggleForm = () => {
    console.log("🚀 ToggleForm Clicked!");
    setIsFormVisible((prevVisible) => {
      console.log("New form visibility:", !prevVisible);
      return !prevVisible;
    });
  };

  const toggleEditForm = () => {
    console.log("🚀 ToggleEditForm Clicked!");
    setIsEditFormVisible((prevVisible) => {
      console.log("New edit form visibility:", !prevVisible);
      return !prevVisible;
    });
  };

  const toggleBookingsPopup = (venueId) => {
    setSelectedVenueId(venueId);
    setIsBookingsVisible(!isBookingsVisible);
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
          open={Boolean(successMessage)}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1500,
            width: "400px",
            height: "auto",
            backgroundColor: "transparent",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Alert
            severity="success"
            onClose={() => setSuccessMessage('')}
            sx={{
              fontSize: "20px",
              padding: "20px",

              textAlign: "center",
            }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </div>

      <Button onClick={toggleForm}>
        {isFormVisible ? "Close Form" : "Create Venue"}
      </Button>
      {isFormVisible && (
        <div
          style={{
            position: "fixed",
            width: "80vw",
            height: "80vh",
            display: "flex",

            alignItems: "center",
            justifyContent: "center",
            zIndex: 3000,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflowY: "auto",
            padding: "20px",
          }}
        >
       
   
          <CreateVenueForm
        
            toggleForm={toggleForm}
    
            
          />
        </div>
      )}

      {Array.isArray(vmVenues) && vmVenues.length > 0 ? (
        vmVenues.filter(venue=> venue).map((venue, index) => (
          <div key={`${venue.id || `fallback`}-${index}`}>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
            <p>City: {venue.location?.city || "Unknown"}</p>
            <p>Country: {venue.location?.country}</p>
            <p>Price: {venue.price || "N/A"}</p>
            {Array.isArray(venue.media) && venue.media.map((image, index) => (
              <img
                key={`${venue.id}-${index}`}
                src={image.url || ""}
                alt={`${venue.name} image ${index + 1}`}
                loading="lazy"
              />

            ))}

            <h2>Available Facilities</h2>
            {venue.meta ? (
              <ul>
                {Object.entries(venue.meta)
                  .filter(([key, value]) => value === true && facilityIcons[key])
                  .map(([facility]) => (
                    <li key={`${venue.id}-${facility || "unknown"}`}>
                      <img
                        src={facilityIcons[facility]}
                        alt={`${facility || "unknown"} icon`}
                      />
                      {facility
                        ? facility.charAt(0).toUpperCase() + facility.slice(1)
                        : "Unknown Facility"}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No Facilities Available</p>
            )}

<Alert
  severity="info"
  onClick={() => toggleBookingsPopup(venue.id)}
  style={{ cursor: 'pointer' }} 
>
  {`This Venue has: (${venue.bookings?.length || 0}) bookings`}
</Alert>

<Button onClick={() => handleDelete(venue.id)}>Delete Venue</Button>

<Button onClick={() => {
  console.log("Setting Selected Venue:", venue); 
  setSelectedVenue(venue);
  setIsEditFormVisible(true); }}>Edit Venue</Button>
          </div>
        ))
      ) : (
        <p>No venues available.</p>
      )}

<Dialog open={isBookingsVisible} onClose={() => setIsBookingsVisible(false)}>
        {selectedVenueId && <SpecificVenueBookings venueId={selectedVenueId} />}
      </Dialog>



{isEditFormVisible && selectedVenue &&(
  <div
    style={{
      position: "fixed",
      width: "80vw",
      height: "80vh",
      display: "hidden",

      alignItems: "center",
      justifyContent: "center",
      zIndex: 3000,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      overflowY: "auto",
      padding: "20px",
    }}
  >
    <EditVenueForm selectedVenue={selectedVenue} toggleEditForm={toggleEditForm} />
  </div>
)}
 

    </div>
  );
}





  


export default Venues;
