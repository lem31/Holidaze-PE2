import { useEffect, useState } from "react";
import useMyStore from "../../Store/index";
import gStyles from "../../CSS_Modules/Global/global.module.css";
import vmProfileStyles from "../../CSS_Modules/VM_Profile/vmProfile.module.css";
import { Button } from "@mui/material";

function VMBookings() {
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);
  const bookingsPerPage = 1;

  const handleNextBooking = () => {
    if (currentBookingIndex < venueBookings.length - 1) {
      setCurrentBookingIndex(currentBookingIndex + 1);
    }
  };

  const handlePrevBooking = () => {
    if (currentBookingIndex > 0) {
      setCurrentBookingIndex(currentBookingIndex - 1);
    }
  };

  const { fetchVMVenues, vmVenues, successMessage } = useMyStore();
  useEffect(() => {
    fetchVMVenues();
  }, [successMessage]);

  const venueBookings = vmVenues.flatMap((venue) => venue.bookings || []);
  const totalPages = Math.ceil(venueBookings.length / bookingsPerPage);

  console.log("Venue Bookings:", venueBookings);

 
  const getVenueForBooking = (booking) =>
    vmVenues.find((v) => v.bookings?.some((b) => b.id === booking.id));

  const getNights = (booking) =>
    Math.max(
      1,
      Math.round(
        (new Date(booking.dateTo) - new Date(booking.dateFrom)) /
          (1000 * 60 * 60 * 24)
      )
    );

  return (
    <div>

      <div className={vmProfileStyles.mobileViewBookings}>
        {venueBookings.length > 0 ? (
          <div className={vmProfileStyles.bookingCardWrapper}>
            <div className={vmProfileStyles.bookingCardBg}>
              <h2 className={gStyles.h2White}>
                {getVenueForBooking(venueBookings[currentBookingIndex])?.name ||
                  "Unknown Venue"}
              </h2>
              <img
                src={
                  getVenueForBooking(venueBookings[currentBookingIndex])
                    ?.media[0]?.url
                }
                alt="Venue"
                className={vmProfileStyles.bookingImage}
              />

              <div className={vmProfileStyles.bookingGridDiv}>
                <p>
                  <strong>Customer:</strong>{" "}
                  {venueBookings[currentBookingIndex].customer.name}
                </p>
                <p>
                  <strong>Total Guests:</strong>{" "}
                  {venueBookings[currentBookingIndex].guests}
                </p>
                <p>
                  <strong>Check-in:</strong>{" "}
                  {new Date(
                    venueBookings[currentBookingIndex].dateFrom
                  ).toLocaleDateString()}
                </p>
                <p>
                  <strong>Check-out:</strong>{" "}
                  {new Date(
                    venueBookings[currentBookingIndex].dateTo
                  ).toLocaleDateString()}
                </p>
              </div>

              <div style={{ marginTop: "20px" }}>
                <Button
                  onClick={handlePrevBooking}
                  disabled={currentBookingIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextBooking}
                  disabled={currentBookingIndex === venueBookings.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className={gStyles.h2White}>No Bookings Available</h2>
            <p>Please check back later.</p>
          </>
        )}
      </div>

  
      <div className={vmProfileStyles.desktopViewBookings}>
        {venueBookings.length > 0 ? (
          venueBookings.map((booking, index) => {
            const venue = getVenueForBooking(booking);
            const nights = getNights(booking);
            return (
              <div
                className={vmProfileStyles.bookingCardWrapper}
                key={booking.id || index}
              >
                <div className={vmProfileStyles.bookingCardBg}>
                  <div className={vmProfileStyles.bookingInfoDiv}>
                    <div className={vmProfileStyles.venueNameImgDiv}>
                      <h2 className={gStyles.h2White}>
                        {venue?.name || "Unknown Venue"}
                      </h2>
                      <img
                        src={venue?.media[0]?.url}
                        alt="Venue"
                        className={vmProfileStyles.bookingImage}
                      />
                    </div>
                    <div className={vmProfileStyles.bookingGridDiv}>
                      <div className={vmProfileStyles.bookingRowDiv}>
                        <p className={gStyles.bodyLPurple}>
                          <strong>Customer</strong>{" "}
                        </p>
                        <p className={gStyles.bodyWhite}>
                          {booking.customer.name}
                        </p>
                      </div>
                      <div className={vmProfileStyles.bookingRowDiv}>
                        <p className={gStyles.bodyLPurple}>
                          <strong>Total Guests</strong>{" "}
                        </p>
                        <p className={gStyles.bodyWhite}>{booking.guests}</p>
                      </div>
                      <div className={vmProfileStyles.bookingRowDiv}>
                        <p className={gStyles.bodyLPurple}>
                          <strong>Check-in</strong>{" "}
                        </p>
                        <p className={gStyles.bodyWhite}>
                          {new Date(booking.dateFrom).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={vmProfileStyles.bookingRowDiv}>
                        <p className={gStyles.bodyLPurple}>
                          <strong>Check-out</strong>{" "}
                        </p>
                        <p className={gStyles.bodyWhite}>
                          {new Date(booking.dateTo).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={vmProfileStyles.bookingRowDiv}>
                        <p className={gStyles.bodyLPurple}>
                          <strong>Duration</strong>{" "}
                        </p>
                        <p className={gStyles.bodyWhite}>{nights} nights</p>
                      </div>
                      <div className={vmProfileStyles.bookingRowDiv}>
                        <p className={gStyles.bodyLPurple}>
                          <strong>Total Price</strong>
                        </p>{" "}
                        <p className={gStyles.bodyWhite}>
                          {venue?.price * nights} NOK
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <h2 className={gStyles.h2White}>No Bookings Available</h2>
            <p>Please check back later.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default VMBookings;
