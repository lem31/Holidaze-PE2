import React, { useEffect, useState } from "react";
import CreateVenueFormBox from "../CreateVenueFormBox";


function Venues({vmVenues}) {


const [isFormVisible, setIsFormVisible] = useState(false);

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
      <img src={venue.media?.[0]?.url || ''} alt={venue.name || 'Venue'} />
    </div>
  ))
) : (
  <p>No venues available.</p>
)}
    </div>
  );
}

export default Venues;