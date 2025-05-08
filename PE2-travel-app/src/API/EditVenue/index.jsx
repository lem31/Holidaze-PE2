export const EditVenue = async (selectedVenueId, updatedVenueData, token) => {
  const API_URL = `https://v2.api.noroff.dev/holidaze/venues/${selectedVenueId}`;

  if (!token) {
    console.error("No token found! API request skipped.");
    return;
  }

  try {
    console.log("📡 Sending API request...");
    console.log("🔍 Selected Venue ID:", selectedVenueId);
    console.log("📡 Sending API request with token:", token);
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
            'X-Noroff-API-Key': 'f920c7be-b352-412a-bfe3-67cf36aebe41',
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

export default EditVenue;
