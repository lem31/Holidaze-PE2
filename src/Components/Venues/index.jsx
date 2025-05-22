import { useEffect, useState } from "react";
import Wifi from "../../assets/Images/Wifi.png";
import Parking from "../../assets/Images/Parking.png";
import Pets from "../../assets/Images/Pets.png";
import Breakfast from "../../assets/Images/Breakfast.png";
import {
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useMyStore from "../../Store";
import CreateVenueForm from "../CreateVenueForm";
import EditVenueForm from "../EditVenueForm";
import SpecificVenueBookings from "../SpecificVenueBookings";
import vmProfileStyles from "../../CSS_Modules/VM_Profile/vmProfile.module.css";
import gStyles from "../../CSS_Modules/Global/global.module.css";
import Carousel from 'react-material-ui-carousel';
import StarIcon from '@mui/icons-material/Star';

function Venues({ vmVenues }) {
  const facilityIcons = {
    wifi: Wifi,
    parking: Parking,
    pets: Pets,
    breakfast: Breakfast,
  };

  const {
    fetchVMVenues,
    successMessage,
    setSuccessMessage,
    selectedVenue,
    setSelectedVenue,
  } = useMyStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isBookingsVisible, setIsBookingsVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { deleteVenue } = useMyStore();


  useEffect(() => {
    fetchVMVenues();
  }, [fetchVMVenues, successMessage]);

  const handleDeleteClick = (venueId) => {
    setSelectedVenueId(venueId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedVenueId) return;

     await deleteVenue(selectedVenueId);
    setOpenDialog(false);

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
      
         <div className={vmProfileStyles.h1CreateBtnDiv}>
      <h1>Venues</h1>
       <Button  className={gStyles.buttonPrimary} onClick={toggleForm}>
      CREATE VENUE
      
      </Button>
</div>
    
     
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
         

          <CreateVenueForm toggleForm={toggleForm} />
        </div>
      )}

     

      {Array.isArray(vmVenues) && vmVenues.length > 0 ? (

        vmVenues.filter((venue) => venue)
          .map((venue, index) => (


            <div className={vmProfileStyles.venueCardPosition}>
          
             <div className={vmProfileStyles.outerBox}>
                  <Alert
                className={vmProfileStyles.bookingsMessage}
                severity="info"
                onClick={() => toggleBookingsPopup(venue.id)}
                style={{ cursor: "pointer" }}
              >
                {`This Venue has: (${venue.bookings?.length || 0}) bookings`}
              </Alert>
                
        <div className={vmProfileStyles.innerBox}>

         
   
            <div className={vmProfileStyles.venueBoxOne} key={`${venue.id || `fallback`}-${index}`}>
             



<div className={vmProfileStyles.carouselContainer}>
    <Carousel className={vmProfileStyles.venueCarousel} autoPlay={false} indicators={false}>
             {Array.isArray(venue.media) &&
                venue.media.map((image, index) => (
                       <div className={vmProfileStyles.imgContainer} key={`${venue.id}-carousel-img-${index}`}>
                  <img
                    className={vmProfileStyles.venueImg}
                    src={image.url || ""}
                    alt={`${venue.name} image ${index + 1}`}
                    loading="lazy"
                  />
                  </div>
                ))}
                  </Carousel>
              
 </div>

            <div className={vmProfileStyles.venueInfoBoxOne}>
              <h2>{venue.name}</h2>
                <p>
                              {venue?.rating && venue.rating > 0 ? (
                                <>
                                  {Array.from({ length: Math.round(venue.rating) }).map((_, i) => (
                                    <StarIcon className={vmProfileStyles.star} key={i}/>
                                  ))}
                                </>
                              ) : (
                                ""
                              )}
                            </p>
              <p>{venue.description}</p>
              <p>City: {venue.location?.city || "Unknown"}</p>
              <p>Country: {venue.location?.country || "Unknown"}</p>
              <p>Price: {venue.price || "N/A"}</p>
               </div>
           
             
            </div>
            <div className={vmProfileStyles.venueInfoBoxTwo}>
            <div className={vmProfileStyles.ratingBox}>
                          <p className={`${gStyles.bodyWhite} ${vmProfileStyles.ratingNumberBg}`}>{venue?.rating}</p>
                        <p className={gStyles.bodyBlack}>
                          {(() => {
                            const rating = Math.round(venue?.rating);
                            if (!rating) return "No rating";
                            if (rating === 1) return "Poor quality";
                            if (rating === 2) return "Not bad quality";
                            if (rating === 3 || rating === 4) return "Good quality";
                            if (rating === 5) return "Excellent quality";
                            return "";
                          })()}
                        </p>
                
            </div>

              <h2>Available Facilities</h2>
              {venue.meta ? (
                <ul>
                  {Object.entries(venue.meta)
                    .filter(
                      ([key, value]) => value === true && facilityIcons[key]
                    )
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

            

              <Button onClick={() => handleDeleteClick(venue.id)}>
                Delete Venue
              </Button>

              <Button
                onClick={() => {
                  console.log("Setting Selected Venue:", venue);
                  setSelectedVenue(venue);
                  setIsEditFormVisible(true);
                }}
              >
                Edit Venue
              </Button>
                </div>

            
        
        
          
          </div>
            </div>
            </div>
            
          ))
      ) : (
        <p>No venues available.</p>
      )}
      

         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this venue?
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={handleConfirmDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

      <Dialog
        open={isBookingsVisible}
        onClose={() => setIsBookingsVisible(false)}
      >
        {selectedVenueId && <SpecificVenueBookings venueId={selectedVenueId} />}
      </Dialog>

      {isEditFormVisible && selectedVenue && (
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
          <EditVenueForm
            selectedVenue={selectedVenue}
            toggleEditForm={toggleEditForm}
          />
        </div>
      )}
    

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
            onClose={() => setSuccessMessage("")}
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

    </div>
  );
}

export default Venues;
