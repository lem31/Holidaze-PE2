

async function postBooking({selectedStayId, dateFrom, dateTo, guests, }) {
    const bookingData ={
        dateFrom: dateFrom,
        dateTo: dateTo,
        guests: guests,
        venueId: selectedStayId,
    };

    const url = 'https://v2.api.noroff.dev/holidaze/bookings'

    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        if (!response.ok) {
            throw new Error('Failed to post booking');
        }
        const data = await response.json();
        console.log('Booking successful:', data);
        return data;
    } catch (error) {
       
        throw error;
    }

}

export default postBooking;