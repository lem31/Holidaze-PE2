/**
 * Venues component displays a list of venues with options to create, edit, and delete venues.
 * It also shows venue details, ratings, facilities, and allows viewing bookings for each venue.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.vmVenues - Array of venue objects to display.
 * @returns {JSX.Element} The rendered Venues component.
 */

import { useEffect, useState } from "react";
import Wifi from "../../assets/Images/Wifi.png";
import Parking from "../../assets/Images/Parking.png";
import Pets from "../../assets/Images/Pets.png";
import Breakfast from "../../assets/Images/Breakfast.png";
import InfoIcon from "@mui/icons-material/Info";
import location from "../../assets/Images/Location-purple.png";
import price from "../../assets/Images/Price-tag-purple.png";
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
import Carousel from "react-material-ui-carousel";
import StarIcon from "@mui/icons-material/Star";

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
  const [messageType, setMessageType] = useState("success");

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
    setIsFormVisible((prevVisible) => {
      return !prevVisible;
    });
  };

  const toggleEditForm = () => {
    setIsEditFormVisible((prevVisible) => {
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
        <h2 className={gStyles.h2Black}>Venues</h2>
        <Button
          className={`${gStyles.buttonPrimary} ${vmProfileStyles.createButton}`}
          onClick={toggleForm}
        >
          CREATE VENUE
        </Button>
      </div>

      {isFormVisible && (
        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
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
            isFormVisible={isFormVisible}
          />
        </div>
      )}

      {Array.isArray(vmVenues) && vmVenues.length > 0 ? (
        vmVenues
          .filter((venue) => venue)
          .map((venue, index) => (
            <div key={venue.id} className={vmProfileStyles.venueCardPosition}>
              <div className={vmProfileStyles.outerBox}>
                <div className={vmProfileStyles.bookingsInfoMsgBox}>
                  <Alert
                    className={vmProfileStyles.bookingsMessage}
                    severity="info"
                    icon={<InfoIcon sx={{ color: "white" }} />}
                    onClick={() => toggleBookingsPopup(venue.id)}
                    style={{ cursor: "pointer", zIndex: 1000 }}
                  >
                    {`This Venue has: (${venue.bookings?.length || 0}) bookings`}
                  </Alert>
                </div>

                <div className={vmProfileStyles.innerBox}>
                  <div
                    className={vmProfileStyles.venueBoxOne}
                    key={`${venue.id || `fallback`}-${index}`}
                  >
                    <div className={vmProfileStyles.venueNameRatingBoxMobile}>
                      <h3
                        className={`${gStyles.h3Black} ${vmProfileStyles.venueNameMobile}`}
                      >
                        {venue.name}
                      </h3>
                      <p className={vmProfileStyles.venueRatingMobile}>
                        {venue?.rating && venue.rating > 0 ? (
                          <>
                            {Array.from({
                              length: Math.round(venue.rating),
                            }).map((_, i) => (
                              <StarIcon
                                className={vmProfileStyles.starMobile}
                                key={`${venue.id}-starMobile-${i}`}
                              />
                            ))}
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>

                    <div className={vmProfileStyles.ratingBoxMobile}>
                      <p
                        className={`${gStyles.bodyWhite} ${vmProfileStyles.ratingNumberBg}`}
                      >
                        {venue?.rating}
                      </p>
                      <p className={gStyles.bodyBlack}>
                        {(() => {
                          const rating = Math.round(venue?.rating);
                          if (!rating) return "No rating";
                          if (rating === 1) return "Poor quality";
                          if (rating === 2) return "Not bad quality";
                          if (rating === 3 || rating === 4)
                            return "Good quality";
                          if (rating === 5) return "Excellent quality";
                          return "";
                        })()}
                      </p>
                    </div>

                    <div className={vmProfileStyles.carouselContainer}>
                      <Carousel
                        className={vmProfileStyles.venueCarousel}
                        autoPlay={false}
                        indicators={false}
                      >
                        {Array.isArray(venue.media) &&
                          venue.media.map((image, index) => (
                            <div
                              className={vmProfileStyles.imgContainer}
                              key={image.url ? `${venue.id}-carousel-img-${image.url}` : `${venue.id}-carousel-img-${index}`}
                            >
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
                      <div className={vmProfileStyles.venueNameRatingBox}>
                        <h3
                          className={`${gStyles.h3Black} ${vmProfileStyles.venueName}`}
                        >
                          {venue.name}
                        </h3>
                        <p className={vmProfileStyles.venueRating}>
                          {venue?.rating && venue.rating > 0 ? (
                            <>
                              {Array.from({
                                length: Math.round(venue.rating),
                              }).map((_, i) => (
                                <StarIcon
                                  className={vmProfileStyles.star}
                                  key={`${venue.id}-star-${i}`}
                                />
                              ))}
                            </>
                          ) : (
                            ""
                          )}
                        </p>
                      </div>

                      <div className={vmProfileStyles.locationBox}>
                        <img
                          src={location}
                          alt="Location"
                          className={vmProfileStyles.icons}
                        />
                        <p>
                          {venue.location?.city || "Unknown City"},{" "}
                          {venue.location?.country || "Unknown Country"}{" "}
                        </p>
                      </div>
                      <div className={vmProfileStyles.descriptionBox}>
                        <p className={vmProfileStyles.description}>
                          {venue.description}
                        </p>
                      </div>
                      <div className={vmProfileStyles.priceBox}>
                        <img
                          src={price}
                          alt="Price"
                          className={vmProfileStyles.icons}
                        />
                        <p> {venue.price || "N/A"}NOK/night</p>
                      </div>
                    </div>
                  </div>
                  <div className={vmProfileStyles.venueInfoBoxTwo}>
                    <div className={vmProfileStyles.ratingBox}>
                      <p
                        className={`${gStyles.bodyWhite} ${vmProfileStyles.ratingNumberBg}`}
                      >
                        {venue?.rating}
                      </p>
                      <p className={gStyles.bodyBlack}>
                        {(() => {
                          const rating = Math.round(venue?.rating);
                          if (!rating) return "No rating";
                          if (rating === 1) return "Poor quality";
                          if (rating === 2) return "Not bad quality";
                          if (rating === 3 || rating === 4)
                            return "Good quality";
                          if (rating === 5) return "Excellent quality";
                          return "";
                        })()}
                      </p>
                    </div>

                    <h4 className={`${gStyles.h4Black} ${vmProfileStyles.h4}`}>
                      Available Facilities
                    </h4>
                    {venue.meta &&
                    Object.values(venue.meta).some((value) => value) ? (
                      <ul className={vmProfileStyles.facilityList}>
                        {Object.entries(venue.meta)
                          .filter(
                            ([key, value]) =>
                              value === true && facilityIcons[key]
                          )
                          .map(([facility]) => (
                            <li
                              className={gStyles.bodyWhite}
                              key={`${venue.id}-${facility} `}
                            >
                              <img
                                src={facilityIcons[facility]}
                                alt={`${facility || "unknown"} icon`}
                              />
                              {facility
                                ? facility.charAt(0).toUpperCase() +
                                  facility.slice(1)
                                : "Unknown Facility"}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className={gStyles.bodyWhite}>No Facilities Available</p>
                    )}

                    <div className={vmProfileStyles.buttonContainer}>
                      <Button
                        type="button"
                        variant="contained"
                        className={gStyles.buttonPrimary}
                        onClick={() => handleDeleteClick(venue.id)}
                      >
                        Delete Venue
                      </Button>

                      <Button
                        type="button"
                        variant="contained"
                        className={gStyles.buttonPrimary}
                        onClick={() => {
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
        {selectedVenueId && isBookingsVisible && (
          <SpecificVenueBookings
            venueId={selectedVenueId}
            onClose={() => setIsBookingsVisible(false)}
          />
        )}
      </Dialog>

      {isEditFormVisible && selectedVenue && (
        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
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
            width: "300px",
            height: "auto",
            backgroundColor: "transparent",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Alert
            severity={messageType}
            onClose={() => setSuccessMessage("")}
            sx={{
              fontSize: "20px",
              padding: "20px",
              textAlign: "center",
              zIndex: 2000,
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
