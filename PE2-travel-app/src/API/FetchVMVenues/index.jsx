async function fetchVMVenues(){
       
       const userName = localStorage.getItem('userName');
        try{
           const response = await fetch(`https://v2.api.noroff.dev/holidaze/${userName}/venues`, {
               method: 'GET',
               headers: {
                   'Authorization': `Bearer ${token}`,
                   'X-Noroff-API-Key': process.env.API_KEY,
               },
           });
       
           if(!response.ok){
               console.error('Failed API Response:', response);
               console.error('API Key Used:', process.env.API_KEY);
               throw new Error('Failed to fetch user venues');
           }
       
           const profileData = await response.json();
           console.log('Profile data:', profileData);
           return profileData;
       } catch(error){
           throw error;
           
           }}
        
        export default fetchVMVenues;

