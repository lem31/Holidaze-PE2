const url = "https://v2.api.noroff.dev/holidaze/venues?_bookings=true";

const fetchStays = async (set) => {

  try {
    const response = await fetch(url); 
    const data = await response.json();
    return data.data;
  
  } catch (error) {

  throw new Error(error.message || "Failed to fetch stays");
  }
};

export default fetchStays;