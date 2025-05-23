import vmProfileStyles from "../../CSS_Modules/VM_Profile/vmProfile.module.css";
import gStyles from "../../CSS_Modules/Global/global.module.css";
import { Button } from "@mui/material";

function BookingCard({ booking, venue, nights, handlePrevBooking, handleNextBooking, currentBookingIndex, venueBookings }) {
  return (
    <div className={vmProfileStyles.bookingCardWrapper}>
      <div className={vmProfileStyles.bookingCardBg}>
        <div className={vmProfileStyles.bookingInfoDiv}>
          <div className={vmProfileStyles.venueNameImgDiv}>
            <h2 className={gStyles.h2White}>
              {venue?.name || "Unknown Venue"}
            </h2>
            <img
              src={venue?.media?.[0]?.url}
              alt="Venue"
              className={vmProfileStyles.bookingImage}
            />
          </div>
          <div className={vmProfileStyles.bookingGridDiv}>
            <div className={vmProfileStyles.bookingRowDiv}>
              <p className={gStyles.bodyLPurple}>
                <strong>Customer</strong>{" "}
              </p>
              <p className={gStyles.bodyWhite}>{booking.customer.name}</p>
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
              {" "}
              <p className={gStyles.bodyLPurple}>
                 <strong>Check-out</strong> {" "}
              </p>
              {" "}
              <p className={gStyles.bodyWhite}>
                {new Date(booking.dateTo).toLocaleDateString()}
                {" "}
              </p>
              {" "}
            </div>
            {" "}
            <div className={vmProfileStyles.bookingRowDiv}>
              {" "}
              <p className={gStyles.bodyLPurple}>
                 <strong>Duration</strong> {" "}
              </p>
               <p className={gStyles.bodyWhite}>{nights} nights</p>
              {" "}
            </div>
            {" "}
            <div className={vmProfileStyles.bookingRowDiv}>
              {" "}
              <p className={gStyles.bodyLPurple}>
                <strong>Total Price</strong>
                {" "}
              </p>{" "}
              {" "}
              <p className={gStyles.bodyWhite}>
                 {venue?.price * nights} NOK {" "}
              </p>
              {" "}
            </div>
            {" "}
            <div className={vmProfileStyles.bookingRowDiv}>
              {" "}
              <p className={gStyles.bodyLPurple}>
                 <strong>Booked on</strong> {" "}
              </p>
              {" "}
              <p className={gStyles.bodyWhite}>
                 {new Date(booking.created).toLocaleDateString()}
                {" "}
              </p>
              {" "}
            </div>
            
          </div>
        </div>

         <div className={vmProfileStyles.buttonDivPopup} style={{ gap: "10px" }}>
              <Button className={gStyles.buttonSecondary} onClick={handlePrevBooking} disabled={currentBookingIndex === 0}>Previous</Button>
              <Button
                className={gStyles.buttonSecondary}
                onClick={handleNextBooking}
                disabled={
                  !venueBookings || currentBookingIndex === (venueBookings?.length ? venueBookings.length - 1 : 0)
                }
              >
                Next
              </Button>
            </div>
      </div>
    </div>
  );
}

export default BookingCard;
