import { useEffect, useState } from "react";
import Location from "../../assets/Images/Location-purple.png";
import Price from "../../assets/Images/Price-tag-purple.png";
import ViewAvailabilityButton from "../ViewAvailabilityButton";
import useMyStore from "../../Store";
import SelectionSearchBar from "../SelectionSearchBar";
import Carousel from 'react-material-ui-carousel';
import homeStyles from '../../CSS_Modules/Home/home.module.css';
import gStyles from '../../CSS_Modules/Global/global.module.css';
import StarIcon from '@mui/icons-material/Star';

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
  const { error, stays } = useMyStore();

  const [filteredStays, setFilteredStays] = useState([]);

  useEffect(() => {
 if (stays.length !== filteredStays.length) {
    setFilteredStays(stays);
  }
  }, [stays]);

  if (error) {
    return <p>Error: Unable to fetch stays.</p>;
  }

 

  return (
    <div>
      <SelectionSearchBar stays={stays || []} onFilter={setFilteredStays} />
      {filteredStays.length > 0 ? (
        filteredStays.map((stay, index) => (
          <div className= {homeStyles.stayCardLayoutBox} key={`${stay?.id || index}`}>
            <div className= {homeStyles.stayCardOuterWrapper}>
<div className= {homeStyles.stayCardWrapper}>
            <div className = {homeStyles.stayImageContainer}>
              {stay?.media?.length > 0 ? (
                <div className={homeStyles.carouselContainer}> 
                  <Carousel className={homeStyles.carousel} autoPlay={false} indicators={true}>
                    {stay.media.map((media, index) => (
                      <div className={homeStyles.imgContainer} key={`${stay.id}-${index}`}>
                        <img
                          className={homeStyles.stayImage}
                          src={media?.url || ""}
                          alt={media?.name || stay?.name || "Unknown Stay"}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              ) : (
                <p>No images available for {stay?.name || "this stay"}.</p>
              )}
            </div>
            <div className={homeStyles.stayDetails}>
              <div className={homeStyles.nameRatingDiv}>
                  <p>
                {stay?.rating && stay.rating > 0 ? (
                  <>
                    {Array.from({ length: Math.round(stay.rating) }).map((_, i) => (
                      <StarIcon className={homeStyles.star} key={i}/>
                    ))}
                  </>
                ) : (
                  "No rating"
                )}
              </p>
              <h1 className={`${homeStyles.h1Home} ${gStyles.h1Black}`}>{stay?.name || "Unknown Stay"}</h1>
            
              </div>
              <p className={`${homeStyles.location} ${gStyles.bodyBlack}`}>
                <img className={homeStyles.stayCardIcons}src={Location} alt="Location icon" />
                {stay?.location?.city || "Unknown City"},{" "}
                {stay?.location?.country || "Unknown Country"}
              </p>
              <p className={`${homeStyles.description} ${gStyles.bodyBlack}`}>{stay?.description || "No description available"}</p>
              <p className ={`${homeStyles.stayCardPrice} ${gStyles.bodyBlack}`}>
                <img className={homeStyles.stayCardIcons} src={Price} alt="Price tag icon" />
                {stay?.price || "N/A"} NOK/night
              </p>
            </div>
            <div className = {homeStyles.ratingAvailabilityBtnDiv}>
<div className={homeStyles.ratingBox}>
              <p className={`${gStyles.bodyWhite} ${homeStyles.ratingNumberBg}`}>{stay?.rating}</p>
            <p className={gStyles.bodyBlack}>
              {(() => {
                const rating = Math.round(stay?.rating);
                if (!rating) return "No rating";
                if (rating === 1) return "Poor quality";
                if (rating === 2) return "Not bad quality";
                if (rating === 3 || rating === 4) return "Good quality";
                if (rating === 5) return "Excellent quality";
                return "";
              })()}
            </p>
            </div>
            <ViewAvailabilityButton stay={stay} />
            </div>
            </div>
            </div>
          </div>
        ))
      ) : (
        <p>No stays found matching your search.</p>
      )}
    </div>
  );
};

export default DisplayStays;
