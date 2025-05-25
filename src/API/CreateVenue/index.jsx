/**
 * Creates a new venue by sending a POST request to the Holidaze API.
 *
 * @async
 * @function createVenue
 * @param {string} token - The authentication token for the API request.
 * @param {Object} venueData - The data for the venue to be created.
 * @param {string} venueData.name - The name of the venue.
 * @param {string} venueData.description - The description of the venue.
 * @param {number} venueData.price - The price per night for the venue.
 * @param {number} venueData.maxGuests - The maximum number of guests allowed.
 * @returns {Promise<Object>} The created venue data from the API.
 * @throws Will throw an error if required venue data is missing or if the API request fails.
 */

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

  

    return data;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};

export default createVenue;
