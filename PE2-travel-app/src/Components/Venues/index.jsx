import React, { useEffect, useState } from "react";
import CreateVenueFormBox from "../CreateVenueFormBox";


function Venues({vmVenues}) {


const [isFormVisible, setIsFormVisible] = useState(false);
const availableFacilities = vmVenues?.meta ? Object.entries(vmVenues.meta).filter(([key, value]) => value === true) : [];

const toggleForm = ()=>{
    setIsFormVisible((prevVisible)=> !prevVisible);
};


  return (
    <div>
   
      <h1>Venues</h1>
      <button onClick={toggleForm}>Create Venue</button>
      {isFormVisible && (
        <div
          style={{
            position: "fixed",
           
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 2, 10, 0.2)", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000, 
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
    
            
          }}
        >
            <div
            style={{
              backgroundColor: "red",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >

          </div>
          <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={toggleForm} 
            >
              Close
            </button>
            <CreateVenueFormBox />
          </div>
       
      )}

{Array.isArray(vmVenues) && vmVenues.length > 0 ? (
  vmVenues.map((venue) => (
    <div key={venue.id}>
      <h2>{venue.name}</h2>
      <p>{venue.description}</p>
      <p>Location: {venue.location?.city || 'Unknown'}</p>
      <p>Price: {venue.price || 'N/A'}</p>
      {venue.media.map((image, index) => (
                <img 
                    key={index} 
                    src={image.url} 
                    alt={`${selectedStay.name} image ${index + 1}`} 
                    loading="lazy"
                />
            ))}

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
    </div>
  ))
) : (
  <p>No venues available.</p>
)}
    </div>
  );
}

export default Venues;