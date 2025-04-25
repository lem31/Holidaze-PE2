import React, {useEffect} from "react";
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
            {stay?.media?.map((media) => (
              <img key={stay.id} src={media.url} alt={stay.name} />
            ))}
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
