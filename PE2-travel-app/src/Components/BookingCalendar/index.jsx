import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import postBooking from "../../API/PostBooking";
import useMyStore from "../../Store";

const BookingCalendar = () => {
    const selectedStay = useMyStore((state) => state.selectedStay);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [bookingMessage, setBookingMessage] = useState(null);

    const handleBooking = async () => {
        if (!startDate || !endDate) {
            setBookingMessage("Please select both check-in and check-out dates.");
            return;
        }
        if (!selectedStay) {
            setBookingMessage("No stay selected.");
            return;
        }
        const bookingData = {
            selectedStayId: selectedStay.id,
            dateFrom: startDate.format("YYYY-MM-DD"),
            dateTo: endDate.format("YYYY-MM-DD"),
            guests: numberOfGuests,

        };

        try {
            const response = await postBooking(bookingData);
            setBookingMessage("Booking successful!");
        } catch (error) {
            setBookingMessage("Booking failed. Please try again.");
        }
};

return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
            <h1>Make a Booking</h1>
            <DatePicker
                label="Check-in"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
               
            />

            <DatePicker
                label="Check-out"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
            />

            <div>
                <label htmlFor="guests">Number of Guests:</label>
                <input
                    type="number"
                    id="guests"
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(e.target.value)}
                    min={1}
                />
            </div>
            <button onClick={handleBooking}>Book Now</button>
            {bookingMessage && <p>{bookingMessage}</p>}
        </div>
    </LocalizationProvider>
) };

export default BookingCalendar;