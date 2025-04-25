import React from 'react';
import Location from '../../assets/Images/Location-purple.png';
import Price from '../../assets/Images/Price-tag-purple.png';
import ViewAvailabilityButton from '../ViewAvailabilityButton';

const DisplayStays = ({ stay }) => {
const mediaImages = stay.media && stay.media.length > 0 ? stay.media : [];

return(
  <div>

<h1> {stay.name}</h1>

   {stay.rating ? ( Array.from({length: 5}).map((_, index)=>(
        <span key={`${stay.id}-star-${index}`}>
            {index< Math.floor(stay.rating) ? "⭐" : index < stay.rating ? "⭐" : "☆"} 
     
    </span>     ))
    ) : ( <p>No rating</p>)}    

    
<p>
<img src={Location} alt="Location" />{stay.location.city}, {stay.location.country}</p>

<p>{stay.rating > 0 ? stay.rating : 'No rating'}</p>

<p>
    {stay.rating >= 4 ? 'Excellent Quality': 
    stay.rating >= 2.5 ? 'Good Quality':
    stay.rating > 0 ? 'Poor Quality': 'N/A'}
</p>
<div>
    {mediaImages.length > 0 ? (
        mediaImages.filter((mediaImage) => mediaImage.url).map((mediaImage, index) => (
            <img  key={`${stay.id}-${index}`} src={mediaImage.url} alt={mediaImage.name || stay.name} loading='lazy' />
        ))
    ) : (
        <p> No images available</p>
    )}

  <p >{stay.description}</p>

  <p> <img src={Price} alt="Price tag" />{stay.price}NOK/night</p>
  </div>

<ViewAvailabilityButton id={stay.id}/>

  </div>
  )}

export default DisplayStays;