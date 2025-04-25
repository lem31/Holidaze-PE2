import React, { useEffect } from "react";
import Location from "../../assets/Images/Location-purple.png";
import Price from "../../assets/Images/Price-tag-purple.png";
import ViewAvailabilityButton from "../ViewAvailabilityButton";
import useMyStore from "../../Store";

const DisplayStays = () => {
  const { stays, fetchStays, loading, error } = useMyStore();

   useEffect(() => {
    fetchStays();
  }, [fetchStays]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: Unable to fetch stays.</p>;
  }

  if (!stays || stays.length === 0) {
    return <p>No stays available.</p>;
  }

  return (
    <div>
      {stays.map((stay) => (
        <div key={stay.id}>
          <h1>{stay?.name || "Unknown Stay"}</h1>

          <p>
            <img src={Location} alt="Location icon" />
            {stay?.location?.city || "Unknown City"}, {stay?.location?.country || "Unknown Country"}
          </p>

           <div>
            {stay?.media?.length > 0 ? (
              stay.media.map((media, index) => (
                <img
                  key={`${stay.id}-${index}`} 
                  src={media.url}
                  alt={media.name || stay.name}
                  loading="lazy" 
                />
              ))
            ) : (
              <p>No images available for {stay.name || "this stay"}.</p>
            )}
          </div>

          <p>{stay?.description || "No description available"}</p>

          <p>
            <img src={Price} alt="Price tag icon" />
            {stay?.price || "N/A"} NOK/night
          </p>

          <ViewAvailabilityButton stay={stay} />
        </div>
      ))}
    </div>
  );
};

export default DisplayStays;
