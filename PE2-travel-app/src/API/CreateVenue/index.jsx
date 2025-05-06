export const createVenue = async (API_URL, venueData, token) => {

  
    try{
        console.log("📡 About to send API request...");
        const response = await fetch(API_URL, {
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
      
 
       return await response.json();
    } catch (error) {
       
        throw error;
    }

}

export default createVenue;
