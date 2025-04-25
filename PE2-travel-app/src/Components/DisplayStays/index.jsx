// import ViewStayButton from "../View_Product_Btn";
import React from 'react';


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
<p>{stay.location.city}, {stay.location.country}</p>

<p>{stay.rating > 0 ? stay.rating : 'No rating'}</p>
<div>
    {mediaImages.length > 0 ? (
        mediaImages.filter((mediaImage) => mediaImage.url).map((mediaImage, index) => (
            <img  key={`${stay.id}-${index}`} src={mediaImage.url} alt={mediaImage.name || stay.name} loading='lazy' />
        ))
    ) : (
        <p> No images available</p>
    )}


  <p >{stay.description}</p>

  <p>{stay.price}NOK/night</p>
  </div>

  </div>
  )}




export default DisplayStays;