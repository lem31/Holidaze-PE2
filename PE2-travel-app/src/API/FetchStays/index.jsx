const fetchStays = async () => {
  try {
    let stays = [];
    let page = 1;
    const limit = 100;
    let moreData = true;

    while (moreData) {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues?_bookings=true&limit=${limit}&page=${page}&sort=created&sortOrder=desc`);
      const data = await response.json();

      if (!data?.data || !Array.isArray(data.data)) {
        console.error("Invalid API response format:", data);
        throw new Error("Invalid API response format");
      }

      stays = [...stays, ...data.data]; 

  
      moreData = data.data.length === limit;  
      page++; 
    }

    console.log("Fetched all stays:", stays);
    return stays;

  } catch (error) {
    console.error("Error fetching all stays:", error);
    throw new Error(error.message || "Failed to fetch all stays");
  }
};

export default fetchStays;
