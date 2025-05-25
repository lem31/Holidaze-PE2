/**
 * Updates an existing venue with new data via the Holidaze API.
 *
 * @async
 * @function editVenue
 * @param {string} selectedVenueId - The ID of the venue to update.
 * @param {Object} updatedVenueData - The updated data for the venue.
 * @param {string} token - The Bearer token for authentication.
 * @returns {Promise<Object>} The updated venue data from the API.
 * @throws {Error} If the API request fails or no token is provided.
 */

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
