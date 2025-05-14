import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import  { useState } from "react";
import postBooking from "../../API/PostBooking";
import useMyStore from "../../Store";
import Guests from "../../assets/Images/guests.png";
import CheckDateConflicts from "../CheckDateConflicts";


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

const BookingCalendar = ({bookingMessage, setBookingMessage}) => {
  const selectedStay = useMyStore((state) => state.selectedStay);
  const isLoggedIn = useMyStore((state) => state.isLoggedIn);
   

const {fetchAndSetSelectedStay} = useMyStore();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

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


  const handleBooking = async () => {
   

    
      if (!isLoggedIn) {
        setBookingMessage("Please log in to make a booking.");
        return;
      }
      if (!startDate || !endDate) {
        setBookingMessage("Please select both check-in and check-out dates.");
        return;
      }
      if (!selectedStay) {
        setBookingMessage("No stay selected.");
        return;
      }
      if (numberOfGuests < 1) {
        setBookingMessage("Please select at least one guest.");
        return;
      }
      if (selectedStay.maxGuests < numberOfGuests) {
        setBookingMessage(`The maximum number of guests for this stay is ${selectedStay.maxGuests}.`);
        return;
      }
    
     
      if (selectedStay.bookings && selectedStay.bookings.length > 0) {
        if (CheckDateConflicts(new Date(startDate), new Date(endDate), selectedStay)) {
          setBookingMessage("Selected dates are already booked. Please choose different dates.");
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
        setBookingMessage("Booking successful!");
         await fetchAndSetSelectedStay(selectedStay.id);
        setTimeout(() => setBookingMessage(null), 5000);
      } catch (error) {
        setBookingMessage("Booking failed. Please try again.");
        console.error("Booking error:", error);
      }
    };
    

  const handleGuestChange = (e) => {
    const value = Number(e.target.value);
    setNumberOfGuests(value);

    if (value < 1) {
      setGuestWarning("Please select at least one guest.");
    } else setGuestWarning(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <h1>Make a Booking</h1>
        <DatePicker
          label="Check-in"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          shouldDisableDate={(date) => unavailableDates.has(date.toISOString().split("T")[0])}

        />

        <DatePicker
          label="Check-out"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          shouldDisableDate={(date) => unavailableDates.has(date.toISOString().split("T")[0])}

        />

        <div>
          <label htmlFor="guests">Number of Guests:</label>
          <img src={Guests} alt="Guests" />
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
        <button type='submit' onClick={handleBooking}>Book Now</button>
        {bookingMessage && <p>{bookingMessage}</p>}
      </div>
    </LocalizationProvider>
  );
};

export default BookingCalendar;
