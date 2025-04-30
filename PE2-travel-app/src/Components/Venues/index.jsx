import React, { useEffect } from "react";
import useMyStore from '../../Store';


function Venues() {
const {vmVenues, fetchVMVenues, loading, error} = useMyStore();
useEffect(() => {
    async function getVenues(){
try{
    await fetchVMVenues( );
    console.log('Fetched venues:', vmVenues);
} catch (error) {
    console.error('Error fetching venues:', error);
}
    }
    getVenues(); }, [fetchVMVenues]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div>
      <h1>Venues</h1>
    {vmVenues?.map((venue) => (
        <div key={venue.data.id}>
          <h2>{venue.data.name}</h2>
          <p>{venue.data.description}</p>
          <p>Location: {venue.data.location}</p>
          <p>Price: {venue.data.price}</p>
          <img src={venue.data.media.url} alt={venue.name} />
        </div>
      ))}
    </div>
  );
}

export default Venues;