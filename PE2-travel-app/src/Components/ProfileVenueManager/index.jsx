import React, { useEffect, useState } from "react";
import useMyStore from "../../Store/index";
import Venues from "../Venues";


const ProfileVenueManager = () => {
  const { userProfile, fetchVMVenues, vmVenues } = useMyStore(); 
  const [selectedView, setSelectedView] = useState("");

  useEffect(() => {
    console.log("Fetching venues...");
    fetchVMVenues();
  }, [fetchVMVenues]);

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
        <button
          onClick={() => {
            setSelectedView("Venues");
            fetchVMVenues(); 
          }}
        >
          Venues
        </button>
        <button onClick={() => setSelectedView("Bookings")}>Bookings</button>
      </div>

      <div>
        {selectedView === "Venues" && <Venues vmVenues={vmVenues} />}
      </div>
    </div>
  );
};

export default ProfileVenueManager;
