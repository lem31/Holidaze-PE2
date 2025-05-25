/**
 * Registers a new user by sending a POST request to the specified endpoint.
 *
 * @async
 * @function
 * @param {string} endpoint - The API endpoint URL for registration.
 * @param {Object} userData - The user data to be sent in the request body.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the registration fails or the API returns an error.
 */

async function onRegister(endpoint, userData) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("API Registration Error:", error);
    throw error;
  }
}
export default onRegister;
