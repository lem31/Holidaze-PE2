/**
 * VMBookings component displays a list of venue bookings for the venue manager.
 *
 * - Fetches venue data and bookings from the store.
 * - Supports pagination for mobile view (one booking per page).
 * - Shows all bookings in a list for desktop view.
 * - Displays a message if no bookings are available.
 *
 * @component
 * @returns {JSX.Element} The rendered VMBookings component.
 */

import { useEffect, useState } from "react";
import useMyStore from "../../Store/index";
import gStyles from "../../CSS_Modules/Global/global.module.css";
import vmProfileStyles from "../../CSS_Modules/VM_Profile/vmProfile.module.css";

import BookingCard from "../BookingCard/bookingCard";

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
      {venueBookings.length > 0 ? (
        <>
          <div className={vmProfileStyles.mobileViewBookings}>
            <BookingCard
              booking={venueBookings[currentBookingIndex]}
              venue={getVenueForBooking(venueBookings[currentBookingIndex])}
              nights={getNights(venueBookings[currentBookingIndex])}
              handlePrevBooking={handlePrevBooking}
              handleNextBooking={handleNextBooking}
              currentBookingIndex={currentBookingIndex}
              venueBookings={venueBookings}
            />
          </div>

          <div className={vmProfileStyles.desktopViewBookings}>
            {venueBookings.map((booking, index) => (
              <BookingCard
                key={booking.id || index}
                booking={booking}
                venue={getVenueForBooking(booking)}
                nights={getNights(booking)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className={gStyles.h2White}>No Bookings Available</h2>
          <p>Please check back later.</p>
        </>
      )}
    </div>
  );
}

export default VMBookings;
