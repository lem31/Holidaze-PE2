const fetchStays = async () => {
  try {
    let stays = [];
    let page = 1;
    const limit = 20;
    let moreData = true;

    while (moreData) {
      const url = `https://v2.api.noroff.dev/holidaze/venues?_bookings=true&limit=${limit}&page=${page}&sort=created&sortOrder=desc`;

      const response = await fetch(url, { 
        
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      console.log("Response URL:", response.url);
      console.log("Response body:", await response.text());
      console.log("Response type:", response.type);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = response.json();

      if (!data?.data || !Array.isArray(data.data)) {
        console.error("Invalid API response format:", data);
        throw new Error("Invalid API response format");
      }

      stays.push(...data.data);

      moreData = data.data.length === limit && page < 10;  
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
 