/**
 * Handles user login by sending credentials to the specified endpoint,
 * decoding the JWT token, updating the store with authentication and user profile data,
 * and navigating to the user's profile page upon successful login.
 *
 * @async
 * @function
 * @param {string} endpoint - The API endpoint for login.
 * @param {Object} userData - The user credentials to be sent in the request body.
 * @param {Function} navigate - Function to navigate to a different route.
 * @returns {Promise<Object>} The response data from the login API or an error object.
 */

import useMyStore from "../../Store/index";
import { jwtDecode } from "jwt-decode";
import fetchUserProfile from "../../API/FetchUserProfile/index";

async function onLogin(endpoint, userData, navigate) {
  const { login, setUserProfile } = useMyStore.getState();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      return errorData;
    }

    const data = await response.json();

    const accessToken = data?.data?.accessToken;
    const userName = data?.data?.name;

    if (accessToken && userName) {
      const decodedToken = jwtDecode(accessToken);

      login(accessToken, userName);

      const profileData = await fetchUserProfile(userName, accessToken);
      if (profileData) {
        setUserProfile(profileData.data);
      } else {
        console.warn("Failed to fetch user profile data.");
      }

      navigate("/MyProfile");
    } else {
      throw new Error("Token or username not found in response");
    }

    return data;
  } catch (error) {
    return { success: false, message: error.message || "Login failed" };
  }
}

export default onLogin;
