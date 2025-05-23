import { useEffect, useState } from "react";
import fetchCustomerBookings from "../../API/FetchCustomerBookings";
import cBookingStyles from '../../CSS_Modules/CustomerBookings/customerBookings.module.css';

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
                    <div className={cBookingStyles.outerContainer} >
                        <div className={cBookingStyles.innerContainer}>
                        
                    <div className={cBookingStyles.cardLayout} key={booking.id}>
                        <div className={cBookingStyles.nameCreatedImgDiv}>
                        <div className={cBookingStyles.nameCreatedDiv}>
                        <h2>{booking.venue?.name || "Venue Not Found"}</h2>
                        <p>Booked on:{new Date(booking.created).toLocaleDateString()}</p>
                        </div>
                        {booking.venue?.media?.[0]?.url ? (
                            <img className={cBookingStyles.bookingImg} src={booking.venue.media[0].url} alt={booking.venue.name} />
                        ) : (
                            <p>No image available</p>
                        )}
                        </div>
                        <div className={cBookingStyles.bookingInfoDiv}>
                        <p>Guests:</p> <p>Check-in:</p> <p>Check-out:</p><p>Number of Nights:</p>  
                            <p>Total Price:</p>
                        <p>{booking.guests}</p>
                        <p>{new Date(booking.dateFrom).toLocaleDateString()}</p>
                        <p>{new Date(booking.dateTo).toLocaleDateString()}</p>
                        <p>{numberOfNights}</p>
                     <p>{totalPrice}</p>
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
