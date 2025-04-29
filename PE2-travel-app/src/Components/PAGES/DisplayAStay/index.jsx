import React,{useEffect, useState} from "react";
import useMyStore from '../../../Store';
import {useParams, useNavigate} from 'react-router-dom';
import BookingCalendar from "../../BookingCalendar";
import Wifi from '../../../assets/Images/wifi.png';
import Parking from '../../../assets/Images/parking.png';
import Pets from '../../../assets/Images/pets.png';
import Breakfast from '../../../assets/Images/breakfast.png';

/**
 * DisplayAStay component fetches and displays details of a selected stay.
 * It uses the useMyStore hook to access the store and fetch stay data.
 * It also includes a booking calendar for users to make reservations.
 * The component handles loading and error states,
 * and displays the stay's name, images, description, price, location,
 * and available facilities.
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @example
 * return (
 * <DisplayAStay />
 * );
 */

const DisplayAStay = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const fetchAndSetSelectedStay = useMyStore((state) => state.fetchAndSetSelectedStay);
    const selectedStay = useMyStore((state) => state.selectedStay);
    const [loading, setLoading] =useState(true);

    const facilityIcons ={
      wifi: Wifi,
      parking: Parking,
      pets: Pets,
      breakfast: Breakfast,
    }
  
    useEffect(() => {

   const fetchStayData = async () => {

    try{
      await fetchAndSetSelectedStay(id);
      setLoading(false);
    } catch (error) {
      navigate("/");
    }
   }
    fetchStayData();
      }, [id, fetchAndSetSelectedStay, navigate]);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!selectedStay) {
        return <div>Stay not found</div>;
    }
    
    const availableFacilities = Object.entries(selectedStay.meta).filter(([key, value]) => value === true);
    return (
        <div>

<h1>{selectedStay.name}</h1>
           
           <div>
           {selectedStay.media.map((image, index) => (
                <img 
                    key={index} 
                    src={image.url} 
                    alt={`${selectedStay.name} image ${index + 1}`} 
                    loading="lazy"
                />
            ))}


            <p>{selectedStay.description}</p>
            <p>Price: {selectedStay.price}</p>
            <p>Location: {selectedStay.location.city}, {selectedStay.location.country}</p>
       
            <h2>Available Facilities</h2>
            {availableFacilities.length > 0 ? (
                  <ul>
            {availableFacilities.map(([facility])=>(
                <li key={facility}>
                    <img src={facilityIcons[facility]} alt={`${facility} icon`} />
                    {facility.charAt(0).toUpperCase() + facility.slice(1)}
                </li>
            ))}
           </ul>
           ) : (
             <p>No Facilities Available</p>
           )}

<BookingCalendar/>

           </div>
        </div>
    );
};

export default DisplayAStay;