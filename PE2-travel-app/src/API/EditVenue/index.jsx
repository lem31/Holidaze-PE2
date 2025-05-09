export const editVenue = async (API_URL,  updatedVenueData, token) => {


  if (!token) {
    console.error("No token found! API request skipped.");
    return;
  }

  try {
   
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': 'f920c7be-b352-412a-bfe3-67cf36aebe41',
        'Content-Type': 'application/json',
       
      },
      body: JSON.stringify(updatedVenueData),
    });

    console.log("🔍 Raw API response:", response);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to post venue: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("Venue created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};

export default editVenue;
