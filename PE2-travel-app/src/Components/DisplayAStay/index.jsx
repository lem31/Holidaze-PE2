import React,{useEffect, useState} from "react";
import useMyStore from '../../Store';
import {useParams, useNavigate} from 'react-router-dom';
import BookingCalendar from "../BookingCalendar";


const DisplayAStay = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const fetchAndSetSelectedStay = useMyStore((state) => state.fetchAndSetSelectedStay);
    const selectedStay = useMyStore((state) => state.selectedStay);
    const [loading, setLoading] =useState(true);
  
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
    
    return (
        <div>
            <h1>{selectedStay.name}</h1>
            <p>{selectedStay.description}</p>
            <p>Price: {selectedStay.price}</p>
            <p>Location: {selectedStay.location.city}, {selectedStay.location.country}</p>
           <div>
           {selectedStay.media.map((image, index) => (
                <img 
                    key={index} 
                    src={image.url} 
                    alt={`${selectedStay.name} image ${index + 1}`} 
                    loading="lazy"
                />
            ))}
<BookingCalendar/>

           </div>
        </div>
    );
};

export default DisplayAStay;