const API_URL = 'https://v2.api.noroff.dev/holidaze/venues/${venueId}';


const deleteVenue = async (venueId, token) =>{
    try{ 
        if(!token){
            console.error("No token provided");
            return;
        }
    const response = await fetch (`${API_URL}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Noroff-API-Key': 'f920c7be-b352-412a-bfe3-67cf36aebe41',
        },
    });
    if(!response.ok){
        console.error('Failed to delete venue:', response);
        throw new Error('Failed to delete venue');
    } console.log('Venue deleted successfully:', venueId);
return true;
} catch(error){
    console.error('Error deleting venue:', error);
    return false;
    
    
    
    }
};

export default deleteVenue;