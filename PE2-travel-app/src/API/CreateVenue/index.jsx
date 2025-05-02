async function createVenue(endPoint, venueData) {
const token = localStorage.getItem('token');
console.log("Token in createVenue:", token);
  console.log("API Endpoint in createVenue:", endPoint);
if (!token) {
    throw new Error('No token found in local storage');
}
    try{
        const response = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'X-Noroff-API-Key': 'f920c7be-b352-412a-bfe3-67cf36aebe41',
             

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
