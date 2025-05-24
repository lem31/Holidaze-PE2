async function fetchUserProfile(userName, token) {
  if (!token) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/profiles/${userName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": "f920c7be-b352-412a-bfe3-67cf36aebe41",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed API Response:", response);
      throw new Error("Failed to fetch user profile");
    }

    const profileData = await response.json();

 

    return profileData
  } catch (error) {
    throw error;
  }
}

export default fetchUserProfile;
