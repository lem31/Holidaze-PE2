/**
 * Posts a new booking to the Holidaze API.
 *
 * Retrieves the authentication token from localStorage, sends a POST request with the booking data,
 * updates the local store and localStorage with the new booking, and returns the response data.
 *
 * @async
 * @function postBooking
 * @param {Object} bookingData - The booking data to be sent to the API.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the token is not found or the API request fails.
 */

import useMyStore from "../../Store/index";

async function postBooking(bookingData) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found in localStorage");
    throw new Error("Token not found in localStorage");
  }

  const API_URL = "https://v2.api.noroff.dev/holidaze/bookings";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "f920c7be-b352-412a-bfe3-67cf36aebe41",
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error("Failed to post booking");
    }
    const data = await response.json();

    useMyStore
      .getState()
      .setVmBookings([...useMyStore.getState().vmBookings, data]);
    localStorage.setItem(
      "vmBookings",
      JSON.stringify(useMyStore.getState().vmBookings)
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export default postBooking;
