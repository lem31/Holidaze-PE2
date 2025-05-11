import React, { useEffect, useState } from "react";
import fetchCustomerBookings from "../../API/FetchCustomerBookings";


const DisplayCustomerBookings = () => { 


    const [bookingsData, setBookingsData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
    try{

   const bookingsData = await fetchCustomerBookings()
    setBookingsData(bookingsData);
    }
    catch (error) {
        console.error('Error fetching customer bookings:', error);
       setError('Error fetching customer bookings');
    } };
    fetchCustomerBookings()}, []);
    if (error) {
        return <div>{error}</div>;
    }
    if (!bookingsData || bookingsData.length === 0) {
        return <div>No bookings found</div>;
    };


    const numberOfNights = (new Date(bookingsData.data.dateTo) - new Date(bookingsData.data.dateFrom)) / (1000 * 60 * 60 * 24);
const totalPrice = bookingsData.venues.price * numberOfNights; ;

    return (
        <div>
            <h1>Bookings</h1>
            {bookingsData.map((booking) => (
                <div key={booking.id}>
                    <h2>{booking.venue.name}</h2>
                    <img src={booking.venue.images[0].url} alt={booking.venue.name} />
                    <p>{booking.data.guests}</p>
                    <p>Check-in: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                    <p>Check-out: {new Date(booking.dateTo).toLocaleDateString()}</p>
                    <p>Number of Nights: {numberOfNights}</p>
                    <p>Total Price: ${totalPrice}</p>
                </div>
            ))}
        </div>
    );
}
export default DisplayCustomerBookings;