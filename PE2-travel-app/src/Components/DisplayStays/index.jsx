import React, {  useEffect, useState } from "react";
import Location from "../../assets/Images/Location-purple.png";
import Price from "../../assets/Images/Price-tag-purple.png";
import ViewAvailabilityButton from "../ViewAvailabilityButton";
import useMyStore from "../../Store";
import SelectionSearchBar from "../SelectionSearchBar";

/**
  * DisplayStays component fetches and displays a list of stays.
  * It uses the useMyStore hook to access the store and fetch stays.
  * It also includes a search bar for filtering stays based on user input.
  * @returns {JSX.Element} The rendered component.
  * @component
  * @example
  * return (
  *  <DisplayStays />
  * );
 */

const DisplayStays = () => {
  const { loading, error, stays, fetchStays } = useMyStore();
  const [filteredStays, setFilteredStays] = useState([]);


  useEffect(() => {
    fetchStays();
  }, [fetchStays]);
  

console.log("Stays data:", stays);

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
      <SelectionSearchBar stays={stays} onFilter={setFilteredStays} />
      {filteredStays.map((stay, index) => (
         <div key={`${stay.id || index}`}>
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
