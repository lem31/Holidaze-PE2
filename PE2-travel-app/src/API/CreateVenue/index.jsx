async function createVenue(){

    

    const url = 'https://v2.api.noroff.dev/holidaze/venues'

    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'X-Noroff-API-Key': process.env.API_KEY,
            },
            body: JSON.stringify(venueData),
        });
        if (!response.ok) {
            throw new Error('Failed to post venue');
        }
        const data = await response.json();
        console.log('Venue created successfully:', data);
        return data;
    } catch (error) {
       
        throw error;
    }

}

export default createVenue;
