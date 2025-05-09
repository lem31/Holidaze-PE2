
import React from 'react';
import useMyStore from '../../Store/index';
async function postBooking(bookingData) {
  

    const API_URL = 'https://v2.api.noroff.dev/holidaze/bookings'

    try{
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'X-Noroff-API-Key': 'f920c7be-b352-412a-bfe3-67cf36aebe41' ,
            },
            body: JSON.stringify(bookingData),
        });
        if (!response.ok) {
            throw new Error('Failed to post booking');
        }
        const data = await response.json();
        console.log('Booking successful:', data);
        useMyStore.getState().setVmBookings([...useMyStore.getState().vmBookings, data]);
        localStorage.setItem('vmBookings', JSON.stringify(useMyStore.getState().vmBookings ));
        console.log('Updated bookings:', useMyStore.getState().vmBookings);
        return data;
    } catch (error) {
       
        throw error;
    }

}

export default postBooking;