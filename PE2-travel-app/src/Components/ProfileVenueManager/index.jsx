import React, { useEffect, useState } from "react";
import useMyStore from "../../Store/index";

const ProfileVenueManager = () => {
  const { fetchUserProfile, userProfile, loadingProfile, userName } = useMyStore();
  const [selectedView, setSelectedView] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        console.log("Fetching user profile...");
        await fetchUserProfile();
        console.log("User profile fetched successfully:", userProfile);
      } catch (error) {
        console.error("Failed to fetch user profile:", error.message);
      }
    };

    getProfile();
  }, [fetchUserProfile, userName]);

  return (
    <div>
      {loadingProfile ? (
        <p>Loading Profile...</p>
      ) : userProfile ? (
        <div>
          <h1>{selectedView}</h1>
          <h2>{userProfile.data.name}</h2>
          <p>{userProfile.data.bio}</p>
          <img src={userProfile.data.banner.url} alt="banner" />
          <img src={userProfile.data.avatar.url} alt="avatar" />
          <div>
            <button onClick={() => setSelectedView("Edit Profile")}>Edit Profile</button>
            <button onClick={() => setSelectedView("Venues")}>Venues</button>
            <button onClick={() => setSelectedView("Bookings")}>Bookings</button>
            <button onClick={() => setSelectedView("Create Venue")}>Create Venue</button>
          </div>
        </div>
      ) : (
        <p>No profile data available, please log in again.</p>
      )}
    </div>
  );
};

export default ProfileVenueManager;
