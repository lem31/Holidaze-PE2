// async function fetchVMBookings(userName, token) {


//     if(!token){
//        throw new Error('User not authenticated');
//     }
   
//     try{
//        console.log('Fetching user bookings for:', userName);
//        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/bookings?_bookings=true`, {
//            method: 'GET',
//            headers: {
//                Authorization: `Bearer ${token}`,
//                'X-Noroff-API-Key': 'f920c7be-b352-412a-bfe3-67cf36aebe41',
//            },
//        });
   
//        if(!response.ok){
//            console.error('Failed API Response:', response);
//            throw new Error('Failed to fetch user profile');
//        }
   
//        const bookingsData = await response.json();
//        console.log('Bookings data:', bookingsData);
//        return bookingsData;
      
//    } catch(error){
//        throw error;
       
//    }}
    
//     export default fetchVMBookings;