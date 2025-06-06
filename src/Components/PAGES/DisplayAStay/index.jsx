/**
 * DisplayAStay component fetches and displays details of a selected stay.
 * It uses the useMyStore hook to access the store and fetch stay data.
 * It also includes a booking calendar for users to make reservations.
 * The component handles loading and error states,
 * and displays the stay's name, images, description, price, location,
 * and available facilities.
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @example
 * return (
 * <DisplayAStay />
 * );
 */

import { useEffect, useState } from "react";
import useMyStore from "../../../Store";
import { useParams, useNavigate } from "react-router-dom";
import BookingCalendar from "../../BookingCalendar";
import Wifi from "../../../assets/Images/Wifi.png";
import Parking from "../../../assets/Images/Parking.png";
import Pets from "../../../assets/Images/Pets.png";
import Breakfast from "../../../assets/Images/Breakfast.png";
import { Snackbar, Alert } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import stayStyles from "../../../CSS_Modules/Stay/stay.module.css";
import StarIcon from "@mui/icons-material/Star";
import CheckDateConflicts from "../../CheckDateConflicts";
import postBooking from "../../../API/PostBooking/index";
import gStyles from "../../../CSS_Modules/Global/global.module.css";
import Location from "../../../assets/Images/Location-pink.png";
import Price from "../../../assets/Images/Price-tag-pink.png";

const DisplayAStay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchAndSetSelectedStay = useMyStore(
    (state) => state.fetchAndSetSelectedStay
  );
  const selectedStay = useMyStore((state) => state.selectedStay);
  const [bookingMessage, setBookingMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useMyStore((state) => state.isLoggedIn);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [alertSeverity, setAlertSeverity] = useState("success");

  const isVenueManager = useMyStore((state) => state.userProfile?.venueManager);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (startDate && endDate && selectedStay?.price) {
      const checkInDate = new Date(startDate);
      const checkOutDate = new Date(endDate);
      const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
      setTotalPrice(nights * selectedStay.price);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, selectedStay]);

  const facilityIcons = {
    wifi: Wifi,
    parking: Parking,
    pets: Pets,
    breakfast: Breakfast,
  };
  useEffect(() => {
    if (!loading && !selectedStay && id) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchStayData = async (id) => {
      try {
        await fetchAndSetSelectedStay(id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stay data:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchStayData(id);
  }, [id]);

  const availableFacilities = selectedStay?.meta
    ? Object.entries(selectedStay.meta).filter(([key, value]) => value === true)
    : [];

  const handleBooking = async () => {
    setBookingMessage("Processing your booking...");
    setAlertSeverity("info");

    if (!isLoggedIn) {
      setAlertSeverity("warning");
      setBookingMessage("Please log in to make a booking.");
      return;
    }
    if (isVenueManager) {
      setAlertSeverity("warning");
      setBookingMessage("Please log in as a guest to make a booking.");
      return;
    }
    if (!startDate || !endDate) {
      setAlertSeverity("warning");
      setBookingMessage("Please select both check-in and check-out dates.");
      return;
    }
    if (!selectedStay) {
      setAlertSeverity("warning");
      setBookingMessage("No stay selected.");
      return;
    }
    if (numberOfGuests < 1) {
      setAlertSeverity("warning");
      setBookingMessage("Please select at least one guest.");
      return;
    }
    if (selectedStay.maxGuests < numberOfGuests) {
      setAlertSeverity("warning");
      setBookingMessage(
        `The maximum number of guests for this stay is ${selectedStay.maxGuests}.`
      );
      return;
    }

    if (selectedStay.bookings && selectedStay.bookings.length > 0) {
      if (
        CheckDateConflicts(new Date(startDate), new Date(endDate), selectedStay)
      ) {
        setBookingMessage(
          "Selected dates are already booked. Please choose different dates."
        );
        return;
      }
    }

    const bookingData = {
      dateFrom: new Date(startDate).toISOString(),
      dateTo: new Date(endDate).toISOString(),
      guests: numberOfGuests,
      venueId: selectedStay.id,
    };

    try {
      await postBooking(bookingData);
      setAlertSeverity("success");
      setTimeout(() => setBookingMessage("Booking successful!"), 500);
      await fetchAndSetSelectedStay(selectedStay.id);
      setTimeout(() => setBookingMessage(null), 5000);
    } catch (error) {
      setAlertSeverity("error");
      setTimeout(
        () => setBookingMessage("Booking failed. Please try again."),
        500
      );
      console.error("Booking error:", error);
    }
  };

  return (
    <div className={stayStyles.stayCardPosition}>
      <h1 style={{textAlign:'center'}} className={gStyles.h1Black}>Venue Availability</h1>
      <div className={stayStyles.stayContainer}>
        <div className={stayStyles.nameRatingImages}>
          <div className={stayStyles.stayNameRatingDiv}>
            <h2 className={`${gStyles.h2White} ${stayStyles.h2}`}>
              {selectedStay.name}
            </h2>
            <p className={stayStyles.stayStar}>
              {selectedStay?.rating && selectedStay.rating > 0 ? (
                <>
                  {Array.from({ length: Math.round(selectedStay.rating) }).map(
                    (_, i) => (
                      <StarIcon className={stayStyles.starIcon} key={i} />
                    )
                  )}
                </>
              ) : (
                "No rating available"
              )}
            </p>
          </div>

          <div className={stayStyles.imageListWrapper}>
            <ImageList
              className={stayStyles.imageListContainer}
              cols={selectedStay.media.length < 2 ? 1 : 2}
            >
              {selectedStay.media.slice(0, 4).map((image, index) => (
                <ImageListItem className={stayStyles.imageListItem} key={index}>
                  <img
                    className={stayStyles.icon}
                    src={image.url}
                    alt={`${selectedStay.name} image ${index + 1}`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </div>
        <div className={stayStyles.bookingSection}>
          <div className={stayStyles.responsiveDiv}>
            <BookingCalendar
              setStartDate={setStartDate}
              startDate={startDate}
              endDate={endDate}
              setEndDate={setEndDate}
              numberOfGuests={numberOfGuests}
              setNumberOfGuests={setNumberOfGuests}
            />
<div className={stayStyles.totalPriceDiv}>
            {startDate && endDate && totalPrice > 0 && (
                    <p className={gStyles.bodyWhite}>
                      Total Price:{" "}
                      {totalPrice > 0 ? `${totalPrice} NOK` : "Select dates"}
                    </p>
                  )}
                  </div>
            <div className={stayStyles.locDescFacilDiv}>
              <div className={stayStyles.locationDescDiv}>
                <div className={stayStyles.locationDiv}>
                  <p className={gStyles.bodyWhite}>
                    <img className={stayStyles.icon} src={Location} alt="location" />
                    Location: {selectedStay.location.city},{" "}
                    {selectedStay.location.country}
                  </p>
                </div>
                <div className={stayStyles.descriptionPriceDiv}>
                  <h2 className={`${gStyles.h2White} ${stayStyles.h2Stay}`}>
                    Description
                  </h2>
                  <div className={stayStyles.descriptionDiv}>
                    <p
                      className={`${stayStyles.description} ${gStyles.bodyWhite}`}
                    >
                      {selectedStay.description}
                    </p>
                  </div>
                  <p className={gStyles.bodyWhite}>
                    <img className={stayStyles.icon} src={Price} alt="price" />
                    Price: {selectedStay.price} NOK
                  </p>
                  
                </div>
              </div>
            </div>

            <Snackbar
              open={Boolean(bookingMessage)}
              autoHideDuration={3000}
              onClose={() => setBookingMessage(null)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed ",
                zIndex: 1000,
                width: "100vw",
                height: "auto",
                backgroundColor: "transparent",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Alert
                severity={alertSeverity}
                onClose={() => setBookingMessage(null)}
                sx={{
                  fontSize: "20px",
                  display: "flex",
                  width: "400px",
                  height: "auto",
                  textWrap: "wrap",
                  zIndex: 1500,
                  textAlign: "center",
                }}
              >
                {bookingMessage}
              </Alert>
            </Snackbar>
          </div>
          <div className={stayStyles.totalPriceDivSmScreen}>
            {startDate && endDate && totalPrice > 0 && (
                    <p className={gStyles.bodyWhite}>
                      Total Price:{" "}
                      {totalPrice > 0 ? `${totalPrice} NOK` : "Select dates"}
                    </p>
                  )}
                  </div>
        </div>
        <div className={stayStyles.facilH2Div}>
          <h2 className={`${gStyles.h2White} ${stayStyles.h2Stay}`}>
            Available Facilities
          </h2>
          {availableFacilities.length > 0 ? (
            <ul className={stayStyles.facilityUl}>
              <div className={stayStyles.facilityDiv}>
                {availableFacilities.map(([facility], index) => (
                  <li className={gStyles.bodyWhite} key={`${selectedStay.id}-${facility.name}-${index}`}>
                    <img
                      className={stayStyles.icon}
                      src={facilityIcons[facility]}
                      alt={`${facility.name} icon`}
                    />
                    {facility.charAt(0).toUpperCase() + facility.slice(1)}
                  </li>
                ))}
              </div>
            </ul>
          ) : (
            <p className={gStyles.bodyWhite}>No Facilities Available</p>
          )}
          <div className={stayStyles.buttonDiv}>
            <button
              className={gStyles.buttonPrimary}
              type="submit"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAStay;
