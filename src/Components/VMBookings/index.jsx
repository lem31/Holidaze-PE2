import  { useEffect} from 'react';
import useMyStore from '../../Store/index';
import gStyles from "../../CSS_Modules/Global/global.module.css";
import vmProfileStyles from "../../CSS_Modules/VM_Profile/vmProfile.module.css";

function VMBookings() {
  const {fetchVMVenues, vmVenues, successMessage} = useMyStore();
    useEffect(() => {
     
  
      fetchVMVenues();
    }, [successMessage]);

  const venueBookings = vmVenues.flatMap(venue=> venue.bookings || []);



  console.log("Venue Bookings:", venueBookings);
  
  
 return (
  <div>
    {venueBookings.length > 0 ? (
      venueBookings.map((booking, index) => {
       
        const venue = vmVenues.find(v => v.bookings?.some(b => b.id === booking.id));
    
const nights = Math.max(1, Math.round((new Date(booking.dateTo) - new Date(booking.dateFrom)) / (1000 * 60 * 60 * 24)));
        return (
          <div className={vmProfileStyles.bookingCardWrapper} key={`${booking.id || `fallback`}-${index}`}>
            <div className={vmProfileStyles.bookingInfoDiv}>
          <div className={vmProfileStyles.venueNameImgDiv}>
              <h2><strong>Venue Name:</strong> {venue?.name || "Unknown Venue"}</h2>
              <img src={venue?.media[0]?.url} alt="Venue" className={vmProfileStyles.bookingImage} />
              </div>
              <p><strong>Customer</strong> {booking.customer.name}</p>
                <p><strong>Total Guests</strong> {booking.guests}</p>
              <p><strong>Date</strong> {booking.dateFrom} - {booking.dateTo}</p>
        <p>Duration:{nights}nights</p>
              <p><strong>Total Price</strong> {venue?.price * nights}</p>
              <p><strong>Created:</strong> Booked on {booking.created}</p>
            </div>
          </div>
        );
      })
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