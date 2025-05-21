import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import useMyStore from "../../Store";
import Guests from "../../assets/Images/Guests.png";
import gStyles from "../../CSS_Modules/Global/global.module.css";
import stayStyles from "../../CSS_Modules/Stay/stay.module.css";

/**
 * BookingCalendar component allows users to make a booking for a selected stay.
 * It includes date pickers for check-in and check-out dates,
 * a dropdown for selecting the number of guests, and a button to confirm the booking.
 * It uses the useMyStore hook to access the store and manage booking state.
 * The component also handles validation for user input and displays appropriate messages.
 * It also checks the user's login status before allowing a booking.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @example
 *
 * return (
 * <BookingCalendar />
 * );
 */

const BookingCalendar = ({
  setStartDate,
  startDate,
  setEndDate,
  endDate,
  numberOfGuests,
  setNumberOfGuests,
  
}) => {
  const selectedStay = useMyStore((state) => state.selectedStay);

  const [guestWarning, setGuestWarning] = useState(null);

  const unavailableDates = new Set();
  selectedStay?.bookings?.forEach((booking) => {
    let currentDate = new Date(booking.dateFrom);
    const endDate = new Date(booking.dateTo);
    while (currentDate <= endDate) {
      unavailableDates.add(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  const handleGuestChange = (e) => {
    const value = Number(e.target.value);
    setNumberOfGuests(value);

    if (value < 1) {
      setGuestWarning("Please select at least one guest.");
    } else setGuestWarning(null);
  };

  return (
    <div>
       <h2 className={`${gStyles.h2White} ${stayStyles.h2Stay}`}>Make a Booking</h2>
 
    
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
  

        <div className={stayStyles.checkInOutDiv}>
       
        <DatePicker
        className={stayStyles.datePicker}
          label="Check-in"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          shouldDisableDate={(date) =>
            unavailableDates.has(date.toISOString().split("T")[0])
          }
        />

        <DatePicker
         className={stayStyles.datePicker}
          label="Check-out"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          shouldDisableDate={(date) =>
            unavailableDates.has(date.toISOString().split("T")[0])
          }
        />
        </div>

        <div>
          <label className={gStyles.bodyWhite} htmlFor="guests">Number of Guests:</label>
          <img className={stayStyles.guestIcon} src={Guests} alt="Guests" />
          <select
            id="guests"
            value={numberOfGuests}
            onChange={handleGuestChange}
          >
            <option value="">Select number of guests</option>
            {Array.from({ length: 21 }, (_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
          {guestWarning && <p> {guestWarning}</p>}
        </div>
        {/* <button type='submit' onClick={handleBooking}>Book Now</button>
        {bookingMessage && <p>{bookingMessage}</p>} */}
     
    </LocalizationProvider>
    </div>
  );
};

export default BookingCalendar;
