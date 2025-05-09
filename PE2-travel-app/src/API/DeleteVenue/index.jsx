const deleteVenue = async (venueId, token) =>{
    try{ 
        if(!token){
            console.error("No token provided");
            return;
        }

        if (!venueId || typeof venueId !== "string" || venueId.length !== 36) { 
            console.error("Invalid venue ID format:", venueId);
            return false;
          }
    const response = await fetch (`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, {
        
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