async function fetchUserProfile(userName, token) {
 if(!token){
    throw new Error('User not authenticated');
 }
 const apiKey = import.meta.env.API_KEY;
 try{
    console.log('Fetching user profile for:', userName);
    const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-Noroff-API-Key': apiKey,
        },
    });

    if(!response.ok){
        console.error('Failed API Response:', response);
        throw new Error('Failed to fetch user profile');
    }

    const profileData = await response.json();
    console.log('Profile data:', profileData);
    return profileData;
} catch(error){
    throw error;
    
}}
 
 export default fetchUserProfile;