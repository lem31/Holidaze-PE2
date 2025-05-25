/**
 * Deletes a venue by its ID from the Holidaze API.
 *
 * @async
 * @function
 * @param {string} venueId - The unique identifier of the venue to delete (must be a 36-character string).
 * @param {string} token - The Bearer token for authentication.
 * @returns {Promise<boolean>} Returns true if the venue was successfully deleted, false otherwise.
 */

const deleteVenue = async (venueId, token) => {
  try {
    if (!token) {
      console.error("No token provided");
      return;
    }

    if (!venueId || typeof venueId !== "string" || venueId.length !== 36) {
      console.error("Invalid venue ID format:", venueId);
      return false;
    }
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/venues/${venueId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "f920c7be-b352-412a-bfe3-67cf36aebe41",
        },
      }
    );

    if (response.status === 204) {
      return true;
    } else {
      console.error(" Failed to delete venue, status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error deleting venue:", error);
    return false;
  }
};

export default deleteVenue;
