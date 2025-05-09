function VMBookings({vmBookings}) {

    
  return (
<div>
    {Array.isArray(vmBookings) && vmBookings.length > 0 ? (
        vmBookings.filter(booking=> booking).map((booking, index) => (
          <div key={`${booking.id || `fallback`}-${index}`}>
            <h2>{booking.venue.name}</h2>
            <p>{booking.customer.name}</p>
            <p>{booking.dateFrom} - {booking.dateTo}</p>
            <p>{booking.guests}</p>
            <p>{booking.price}</p>
              <p>{booking.created}</p>
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