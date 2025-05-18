async function fetchCustomerBookings() {

    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    if (!userName || !token) {
        console.error('Invalid input: userName and token are required');
        throw new Error('Invalid input: userName and token are required');
    }

    try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}/bookings?_venue=true`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'X-Noroff-API-Key': 'f920c7be-b352-412a-bfe3-67cf36aebe41',
            },
        });

        if (!response.ok) {
            console.error('Failed API Response:', response);
            throw new Error('Failed to fetch user bookings');
        }

        const bookingsData = await response.json();

        console.log('Full API Response:', bookingsData);
console.log('First Booking:', bookingsData.data[0]);
console.log('Venue Data:', bookingsData.data[0]?.venue);
        console.log('Bookings Data:', bookingsData);
        return bookingsData.data;
    } catch (error) {
        console.error('Error fetching user venues:', error);
        throw error;
    }
}

export default fetchCustomerBookings;