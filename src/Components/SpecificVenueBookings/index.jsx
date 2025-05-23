import useMyStore from '../../Store/index';
import  { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button } from "@mui/material";
import gStyles from "../../CSS_Modules/Global/global.module.css";


function SpecificVenueBookings({venueId, onClose}) {
    const [isTableVisible, setIsTableVisible] = useState(true);


    
const handleClose = () => {

  setIsTableVisible(false);

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
            <TableCell colSpan={6} align="center">No Bookings Available</TableCell>
            </TableRow>
        )}
        </TableBody>
    </Table>



  <Button className={gStyles.buttonSecondary} onClick={onClose} variant="contained" sx={{ mt: 2 }}>Close</Button>

    </TableContainer>
    </>
) : null;
}

    


export default SpecificVenueBookings;