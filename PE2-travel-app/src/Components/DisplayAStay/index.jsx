import React,{useEffect, useState} from "react";
import useMyStore from '../../Store';
import {useParams, useNavigate} from 'react-router-dom';


const DisplayAStay = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const selectedStay = useMyStore((state) => state.selectedStay);
    const setSelectedStay = useMyStore((state) => state.setSelectedStay);
    const stays= useMyStore((state) => state.stays);
    const [loading, setLoading] =useState(true);
    const fetchStays = useMyStore((state) => state.fetchStays);


    useEffect(() => {
        const savedStay = JSON.parse(localStorage.getItem("selectedStay"));
        let status;
      
        if (savedStay?.id === id) {
          status = "savedStayFound";
        } else if (stays.length > 0) {
          const stay = stays.find((stay) => stay.id === id);
          if (stay) {
            status = "stayFoundInStore";
            setSelectedStay(stay);
            setLoading(false);
          } else {
            status = "stayNotFound";
          }
        } else {
          status = "fetchStays";
        }
      
        switch (status) {
          case "savedStayFound":
            setSelectedStay(savedStay);
            setLoading(false);
            break;
      
          case "stayFoundInStore":
            setSelectedStay(stay);
            setLoading(false);
            break;
      
          case "stayNotFound":
            navigate("/");
            break;
      
          case "fetchStays":
            fetchStays().then(() => {
              const stay = useMyStore.getState().stays.find((stay) => stay.id === id);
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
            <p>Location: {selectedStay.location.city}</p>
           <div>
           {selectedStay.media.map((image, index) => (
                <img 
                    key={index} 
                    src={image.url} 
                    alt={`${selectedStay.name} image ${index + 1}`} 
                    loading="lazy"
                />
            ))}
           </div>
        </div>
    );
};

export default DisplayAStay;