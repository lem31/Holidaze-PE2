async function createVenue(){

    const venueData ={
      name: venueName,
        description: description,
        media: [
            {
                url: imageUrl,
                type: 'image',
                alt: url,
                type: 'text',
            },
        ],
        price: price,
        maxGuests: maxGuests,
        rating: rating,
        meta: {
            wifi: wifi,
            parking: parking,
            breakfast: breakfast,
            pets: pets,},
        location: {
            address: address,
            city: city,
            zip: zip,
            country: country,
            continent: continent,
            lat: lat,
            lng: lng,
        },

    };

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
