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
              <h2 style={{marginBottom: '12px'}}className={gStyles.h2White}><strong>{venue?.name || "Unknown Venue"}</strong> </h2>
              <img src={venue?.media[0]?.url} alt="Venue" className={vmProfileStyles.bookingImage} />
              </div>
              <div>
                <div className={vmProfileStyles.bookingRowDiv}>
              <p className={gStyles.bodyLPurple}><strong>Customer</strong></p>
               <p className={gStyles.bodyWhite}> {booking.customer.name}</p>
               </div>
                <div className={vmProfileStyles.bookingRowDiv}>
                <p className={gStyles.bodyLPurple}><strong>Total Guests</strong></p> 
                <p className={gStyles.bodyWhite}>{booking.guests}</p>
                 </div>
                  <div className={vmProfileStyles.bookingRowDiv}>
              <p className={gStyles.bodyLPurple}><strong>Check-in</strong></p> 
              <p className={gStyles.bodyWhite}>{new Date(booking.dateFrom).toLocaleDateString()}</p> 
              </div>
              
                <div className={vmProfileStyles.bookingRowDiv}>
              <p className={gStyles.bodyLPurple}><strong>Check-out</strong></p> 
              <p className={gStyles.bodyWhite}>{new Date(booking.dateTo).toLocaleDateString()}</p>
              
               </div>
                 <div className={vmProfileStyles.bookingRowDiv}>
        <p className={gStyles.bodyLPurple}>Duration</p>
      
          <p className={gStyles.bodyWhite}>{nights}/nights</p>
            </div>
 <div className={vmProfileStyles.bookingRowDiv}>
              <p className={gStyles.bodyLPurple}><strong>Total Price</strong></p> 
              <p className={gStyles.bodyWhite}>{venue?.price * nights}NOK</p>
               </div>
                <div className={vmProfileStyles.bookingRowDiv}>
              <p className={gStyles.bodyLPurple}><strong>Booked on</strong></p> 
              <p className={gStyles.bodyWhite}>{new Date(booking.created).toLocaleDateString()}</p>
                </div>
              </div>
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