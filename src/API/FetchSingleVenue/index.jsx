/**
 * Fetches details for a single venue by its ID, including its bookings.
 *
 * @async
 * @function fetchSingleVenue
 * @param {string} id - The unique identifier of the venue to fetch.
 * @returns {Promise<Object>} The data object containing venue details.
 * @throws {Error} If the fetch request fails or the response is not ok.
 */

async function fetchSingleVenue(id) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/venues/${id}/?_bookings=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed API Response:", response);
      throw new Error("Failed to fetch venue");
    }

    const singleVenue = await response.json();

    return singleVenue.data;
  } catch (error) {
    console.error("Error fetching user venues:", error);
    throw error;
  }
}

export default fetchSingleVenue;
