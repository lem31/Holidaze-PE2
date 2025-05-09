import React, { useEffect} from 'react';
import useMyStore from '../../Store/index';

function VMBookings() {
  const {fetchVMVenues, vmVenues, successMessage} = useMyStore();
    useEffect(() => {
     
  
      fetchVMVenues();
    }, [successMessage]);
  const venueBookings = vmVenues.flatMap(venue=> venue.bookings || []);
  
  
  return (
    <div>
    {venueBookings.length > 0 ? (
      venueBookings.map((booking, index) => (
        <div key={`${booking.id || `fallback`}-${index}`}>
          <h2>Booking ID: {booking.id}</h2>
          <p>Customer: {booking.customer.name}</p>
          <p>Date: {booking.dateFrom} - {booking.dateTo}</p>
          <p>Guests: {booking.guests}</p>
          <p>Price: {booking.price}</p>
          <p>Created: {booking.created}</p>
        </div>
          ))
        ) : (
          <>
            <h2>No Bookings Available</h2>
            <p>Please check back later.</p>
          </>
        )}



        </div>
 
  );

}

export default VMBookings;