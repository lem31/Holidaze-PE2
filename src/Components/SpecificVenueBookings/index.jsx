import useMyStore from '../../Store/index';
import  { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button } from "@mui/material";
import gStyles from "../../CSS_Modules/Global/global.module.css";
import vmProfileStyles from "../../CSS_Modules/VM_Profile/vmProfile.module.css";


function SpecificVenueBookings({venueId, onClose}) {
    const [isTableVisible, setIsTableVisible] = useState(true);
const [currentBookingIndex, setCurrentBookingIndex] = useState(0);
const bookingsPerPage = 1; 

const handleNextBooking = () => {
  if (currentBookingIndex < venueBookings.length - 1) {
    setCurrentBookingIndex(currentBookingIndex + 1);
  }
};

const handlePrevBooking = () => {
  if (currentBookingIndex > 0) {
    setCurrentBookingIndex(currentBookingIndex - 1);
  }
};

    

    const {fetchVMVenues, vmVenues, successMessage} = useMyStore();
    useEffect(() => {
     
       
  
      fetchVMVenues();
    }, [successMessage]);

    const venueBookings = vmVenues
    .filter((venue) => venue.id === venueId)
    .flatMap((venue) => venue.bookings || []);

    const venue = vmVenues.find((venue) => venue.id === venueId);


return isTableVisible ? (
    <>

    <div className={vmProfileStyles.mobileViewBookings}>
        <div style={{ textAlign: "center", padding: "20px" }}>
  <h2>{venue?.name || "Venue Bookings"}</h2>


  {venue?.media && venue.media.length > 0 && (
    <img
      src={venue.media[0]?.url}
      alt={venue.name}
      style={{ width: "100%", borderRadius: "8px" }}
    />
  )}


  {venueBookings.length > 0 ? (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Booking {currentBookingIndex + 1} of {venueBookings.length}</h3>
      <p><strong>Customer:</strong> {venueBookings[currentBookingIndex].customer?.name || "Unknown"}</p>
      <p><strong>Total Guests:</strong> {venueBookings[currentBookingIndex].guests}</p>
      <p><strong>Check-in:</strong> {new Date(venueBookings[currentBookingIndex].dateFrom).toLocaleDateString()}</p>
      <p><strong>Check-out:</strong> {new Date(venueBookings[currentBookingIndex].dateTo).toLocaleDateString()}</p>
      <p><strong>Total Price:</strong> {venue?.price * Math.max(1, Math.round((new Date(venueBookings[currentBookingIndex].dateTo) - new Date(venueBookings[currentBookingIndex].dateFrom)) / (1000 * 60 * 60 * 24)))} NOK</p>
    </div>
  ) : (
    <p>No Bookings Available</p>
  )}


  <div className={vmProfileStyles.buttonDivPopup}style={{ marginTop: "20px", gap: "10px",  }}>
    <Button className={gStyles.buttonSecondary} onClick={handlePrevBooking} disabled={currentBookingIndex === 0}>Previous</Button>
    <Button className={gStyles.buttonSecondary} onClick={handleNextBooking} disabled={currentBookingIndex === venueBookings.length - 1}>Next</Button>
  </div>

  <div>
    <Button className={gStyles.buttonSecondary} onClick={onClose} variant="contained" sx={{ mt: 2 }}>Close</Button>
       
  </div>
</div>
    </div>

    <div className={vmProfileStyles.desktopViewBookings}>
  
    <TableContainer  component={Paper} sx={{ width: "900px", maxHeight: "300px", margin: "auto", padding: "50px", backgroundColor: "#320e3b", border: "3px solid", borderColor: "#a6cfd5",  overflowX: "hidden", overflowY: "scroll",  }}>
    <h2 className={gStyles.h2White} style={{ display:'flex', alignItems: 'flex-start', width: '680px', textAlign: "left", marginBottom: "16px" }}>
        {venue?.name || "Venue Bookings"}
    </h2>
    <Table  aria-label="simple table">
        <TableHead >
        <TableRow  >
            <TableCell   sx={{color:'#7f96ff'}}><strong>Customer</strong></TableCell>
            <TableCell sx={{color:'#7f96ff'}}><strong>Total Guests</strong></TableCell>
            <TableCell sx={{color:'#7f96ff'}}><strong>Check-in</strong></TableCell>
            <TableCell sx={{color:'#7f96ff'}}><strong>Check-out</strong></TableCell>
            <TableCell sx={{color:'#7f96ff'}}><strong>Duration</strong></TableCell>
            <TableCell sx={{color:'#7f96ff'}}><strong>Total Price</strong></TableCell>
            <TableCell sx={{color:'#7f96ff'}}><strong>Created</strong></TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {venueBookings.length > 0 ? (
            venueBookings.map((booking, index) => {
            const checkIn = new Date(booking.dateFrom);
            const checkOut = new Date(booking.dateTo);
            const nights = Math.max(1, Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
            const totalPrice = venue?.price * nights || "N/A";
            return (
                <TableRow key={`${booking.id || `fallback`}-${index}`}>
                <TableCell className={gStyles.bodyWhite}>{booking.customer?.name || "Unknown"}</TableCell>
                <TableCell className={gStyles.bodyWhite}>{booking.guests}</TableCell>
                <TableCell className={gStyles.bodyWhite}>{checkIn.toLocaleDateString()}</TableCell>
                <TableCell className={gStyles.bodyWhite}>{checkOut.toLocaleDateString()}</TableCell>
                <TableCell  className={gStyles.bodyWhite}>{nights} </TableCell>
                <TableCell className={gStyles.bodyWhite}>{totalPrice} NOK</TableCell>
                <TableCell className={gStyles.bodyWhite}>{new Date(booking.created).toLocaleString()}</TableCell>
                </TableRow>
            );
            })
        ) : (
            <TableRow>
            <TableCell className={gStyles.bodyWhite} colSpan={6} align="center">No Bookings Available</TableCell>
            </TableRow>
        )}
        </TableBody>
    </Table>



  <Button className={gStyles.buttonSecondary} onClick={onClose} variant="contained" sx={{ mt: 2 }}>Close</Button>

    </TableContainer>
    </div>
    </>
) : null;
}

    


export default SpecificVenueBookings;