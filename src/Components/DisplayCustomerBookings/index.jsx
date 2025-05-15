import React, { useEffect, useState } from "react";
import fetchCustomerBookings from "../../API/FetchCustomerBookings";

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
            <h1>Bookings</h1>
            {bookingsData.map((booking) => {
             
                const numberOfNights = (new Date(booking.dateTo) - new Date(booking.dateFrom)) / (1000 * 60 * 60 * 24);
                const totalPrice = booking.venue?.price ? booking.venue.price * numberOfNights : "N/A";

                return (
                    <div key={booking.id}>
                        <h2>{booking.venue?.name || "Venue Not Found"}</h2>
                        {booking.venue?.media?.[0]?.url ? (
                            <img src={booking.venue.media[0].url} alt={booking.venue.name} />
                        ) : (
                            <p>No image available</p>
                        )}
                        <p>Guests: {booking.guests}</p>
                        <p>Check-in: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                        <p>Check-out: {new Date(booking.dateTo).toLocaleDateString()}</p>
                        <p>Number of Nights: {numberOfNights}</p>
                        <p>Total Price: {totalPrice}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default DisplayCustomerBookings;
