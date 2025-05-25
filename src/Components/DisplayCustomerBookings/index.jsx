/**
 * DisplayCustomerBookings component fetches and displays a list of customer bookings.
 *
 * - Fetches booking data from the API on mount.
 * - Handles loading, error, and empty states.
 * - Displays booking details including venue, dates, guests, and total price.
 * - Responsive layout for desktop and mobile views.
 *
 * @component
 * @returns {JSX.Element} The rendered list of customer bookings or a message if none are found.
 */

import { useEffect, useState } from "react";
import fetchCustomerBookings from "../../API/FetchCustomerBookings";
import cBookingStyles from "../../CSS_Modules/CustomerBookings/customerBookings.module.css";
import gStyles from "../../CSS_Modules/Global/global.module.css";

const DisplayCustomerBookings = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await fetchCustomerBookings();
        setBookingsData(bookings);
      } catch (error) {
        console.error("Error fetching customer bookings:", error);
        setError("Error fetching customer bookings");
      }
    };

    fetchBookings();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  if (!bookingsData || bookingsData.length === 0) {
    return <div>No bookings found</div>;
  }

  return (
    <div>
      <div className={cBookingStyles.h1Div}>
        <h1 className={`${gStyles.h1Black}${cBookingStyles.h1}`}>Bookings</h1>
      </div>
      {bookingsData.map((booking) => {
        const numberOfNights =
          (new Date(booking.dateTo) - new Date(booking.dateFrom)) /
          (1000 * 60 * 60 * 24);
        const totalPrice = booking.venue?.price
          ? booking.venue.price * numberOfNights
          : "N/A";

        return (
          <div className={cBookingStyles.outerContainer} key={booking.id}>
            <div className={cBookingStyles.innerContainer}>
              <div className={cBookingStyles.cardLayout} >
                <div className={cBookingStyles.nameCreatedDiv}>
                  <div className={cBookingStyles.h2Div}>
                    <h2 className={`${gStyles.h2White} ${cBookingStyles.h2}`}>
                      {booking.venue?.name || "Venue Not Found"}
                    </h2>
                  </div>
                  <p className={gStyles.bodyWhite}>
                    Booked on:{new Date(booking.created).toLocaleDateString()}
                  </p>
                </div>
                <div className={cBookingStyles.bookingDetailsContainer}>
                  {booking.venue?.media?.[0]?.url ? (
                    <img
                      className={cBookingStyles.bookingImg}
                      src={booking.venue.media[0].url}
                      alt={booking.venue.name}
                    />
                  ) : (
                    <p>No image available</p>
                  )}

                  <div className={cBookingStyles.bookingInfoDiv}>
                    <div className={cBookingStyles.bookingInfoGrid}>
                      <p className={gStyles.bodyWhite}>Guests:</p>
                      <p className={gStyles.bodyWhite}>Check-in:</p>
                      <p className={gStyles.bodyWhite}>Check-out:</p>
                      <p className={gStyles.bodyWhite}>No. of Nights:</p>
                      <p className={gStyles.bodyWhite}>Total Price:</p>
                      <p className={gStyles.bodyWhite}>{booking.guests}</p>
                      <p className={gStyles.bodyWhite}>
                        {new Date(booking.dateFrom).toLocaleDateString()}
                      </p>
                      <p className={gStyles.bodyWhite}>
                        {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                      <p className={gStyles.bodyWhite}>{numberOfNights}</p>
                      <p className={gStyles.bodyWhite}>{totalPrice}NOK</p>
                    </div>

                    <div className={cBookingStyles.bookingInfoGridMobile}>
                      <p className={gStyles.bodyWhite}>Guests:</p>
                      <p className={gStyles.bodyWhite}>{booking.guests}</p>
                      <p className={gStyles.bodyWhite}>Check-in:</p>
                      <p className={gStyles.bodyWhite}>
                        {new Date(booking.dateFrom).toLocaleDateString()}
                      </p>
                      <p className={gStyles.bodyWhite}>Check-out:</p>

                      <p className={gStyles.bodyWhite}>
                        {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                      <p className={gStyles.bodyWhite}>No. of Nights:</p>
                      <p className={gStyles.bodyWhite}>{numberOfNights}</p>
                      <p className={gStyles.bodyWhite}>Total Price:</p>

                      <p className={gStyles.bodyWhite}>{totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayCustomerBookings;
