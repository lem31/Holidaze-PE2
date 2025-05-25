/**
 * Fetches the bookings for the currently logged-in customer from the Holidaze API.
 *
 * Retrieves the user's bookings, including venue details, using the stored userName and token from localStorage.
 * Throws an error if authentication details are missing or if the API request fails.
 *
 * @async
 * @function fetchCustomerBookings
 * @returns {Promise<Array>} Resolves to an array of booking objects for the user.
 * @throws {Error} If userName or token is missing, or if the API request fails.
 */

async function fetchCustomerBookings() {
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");
  if (!userName || !token) {
    console.error("Invalid input: userName and token are required");
    throw new Error("Invalid input: userName and token are required");
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/profiles/${userName}/bookings?_venue=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "f920c7be-b352-412a-bfe3-67cf36aebe41",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed API Response:", response);
      throw new Error("Failed to fetch user bookings");
    }

    const bookingsData = await response.json();

    return bookingsData.data;
  } catch (error) {
    console.error("Error fetching user venues:", error);
    throw error;
  }
}

export default fetchCustomerBookings;
