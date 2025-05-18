export const createVenue = async (token, venueData) => {
  const API_URL = "https://v2.api.noroff.dev/holidaze/venues";

  if (!token) {
    console.error("No token found! API request skipped.");
    return;
  }

  if (!venueData.name || !venueData.description || venueData.price === undefined || venueData.maxGuests === undefined) {
  throw new Error("Missing required venue data! Ensure name, description, price, and maxGuests are provided.");
}
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "f920c7be-b352-412a-bfe3-67cf36aebe41",
      },
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to post venue: ${errorMessage}`);
    }

    const data = await response.json();

    console.log("Full API Response:", data);

    return data;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};

export default createVenue;
