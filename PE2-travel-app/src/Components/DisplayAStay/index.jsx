import React,{useEffect, useState} from "react";
import useMyStore from '../../Store';
import {useParams, useNavigate} from 'react-router-dom';
import Calendar from "../Calendar";


const DisplayAStay = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const selectedStay = useMyStore((state) => state.selectedStay);
    const setSelectedStay = useMyStore((state) => state.setSelectedStay);
    const stays= useMyStore((state) => state.stays);
    const [loading, setLoading] =useState(true);
    const fetchStays = useMyStore((state) => state.fetchStays);


    useEffect(() => {

      const savedStay = (() => {
        try{
          return JSON.parse(localStorage.getItem("selectedStay"));
        } catch (error) {
          console.error("Error parsing selectedStay from localStorage:", error);
          return null;
        }
      })()
      
      let status = savedStay ?.id === id ? "savedStayFound" : stays.length> 0 ? 
      stays.find((stay) => stay.id === id )
      ? "stayFoundInStore" : "stayNotFound" : "fetchStays";
      
        switch (status) {
          case "savedStayFound":
            setSelectedStay(savedStay);
            setLoading(false);
            break;
      
          case "stayFoundInStore":
            const stay = stays.find((stay) => stay.id === id);
            setSelectedStay(stay);
            setLoading(false);
            break;
      
          case "stayNotFound":
            navigate("/");
            break;
      
          case "fetchStays":
            fetchStays().then(() => {
              const updatedStays = useMyStore.getState().stays;
              const stay = updatedStays.find((stay) => stay.id === id);
              if (stay) {
                setSelectedStay(stay);
                setLoading(false);
              } else {
                navigate("/");
              }
            });
            break;
      
          default:
            console.error("Unexpected status in useEffect switch.");
        }
      }, [id, stays, setSelectedStay, fetchStays, navigate]);
      
      if (loading) {
        return <p>Loading...</p>; 
    }

    if (!selectedStay) {
        return <p>Stay not found.</p>; 
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
<Calendar/>

           </div>
        </div>
    );
};

export default DisplayAStay;