import React, { useState } from "react";
import useMyStore from "../../Store/index";

const ProfileVenueManager = () => {
  const { userProfile } = useMyStore(); 
  const [selectedView, setSelectedView] = useState("");

  if (!userProfile) {
    return <p>No profile data available, please log in again.</p>;
  }

  return (
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
  );
};

export default ProfileVenueManager;
