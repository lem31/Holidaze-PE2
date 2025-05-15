async function fetchSingleVenue(id) {

  

    try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}/?_bookings=true`, {
            method: 'GET',
            headers: {
             'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed API Response:', response);
            throw new Error('Failed to fetch venue');
        }

        const singleVenue = await response.json();

        console.log('Full API Response:', singleVenue);
console.log('Single Venue:', singleVenue.data[0]);

       
       return singleVenue.data;
    } catch (error) {
        console.error('Error fetching user venues:', error);
        throw error;
    }
}



export default fetchSingleVenue;