/**
 * Updates the user profile by sending a PUT request to the specified endpoint.
 *
 * @async
 * @param {Object} userData - The user data to update.
 * @param {string} endpoint - The API endpoint URL.
 * @param {string} token - The Bearer token for authorization.
 * @returns {Promise<Object>} The updated profile data from the API.
 * @throws {Error} If the request fails or the response is not ok.
 */

async function updateProfile(userData, endpoint, token) {
  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "f920c7be-b352-412a-bfe3-67cf36aebe41",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
export default updateProfile;
