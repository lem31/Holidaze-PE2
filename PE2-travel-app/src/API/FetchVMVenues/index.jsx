async function fetchVMVenues(userName, token) {
       
     
       const apiKey = import.meta.env.API_KEY;
        try{
           const response = await fetch(`https://v2.api.noroff.dev/holidaze/${userName}/venues`, {
               method: 'GET',
               headers: {
                   'Authorization': `Bearer ${token}`,
                   'X-Noroff-API-Key': apiKey,
               },
           });
       
           if(!response.ok){
               console.error('Failed API Response:', response);
          
               throw new Error('Failed to fetch user venues');
           }
       
           const profileData = await response.json();
           console.log('Profile data:', profileData);
           return profileData;
       } catch(error){
           throw error;
           
           }}
        
        export default fetchVMVenues;

