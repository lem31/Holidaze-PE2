export const editVenue = async (selectedVenueId, updatedVenueData, token) => {
  const API_URL = `https://v2.api.noroff.dev/holidaze/venues/${selectedVenueId}`;

  if (!token) {
    console.error("No token found! API request skipped.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "f920c7be-b352-412a-bfe3-67cf36aebe41",
      },
      body: JSON.stringify(updatedVenueData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to post venue: ${errorMessage}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};

export default editVenue;
