const url = "https://v2.api.noroff.dev/holidaze/venues?_bookings=true";

const fetchStays = async () => {

  try {
    const response = await fetch(url); 
    const data = await response.json();

    console.log('API Response:', data); 

    if(!data.data|| !Array.isArray(data.data)){
      console.error("Invalid API response format:", data);
      throw new Error("Invalid API response format");
    }

  

    const stays = data.data;
   
console.log("Stays with bookings:", stays);
  
    return stays;

  
  } catch (error) {

  throw new Error(error.message || "Failed to fetch stays");
  }
};

export default fetchStays;