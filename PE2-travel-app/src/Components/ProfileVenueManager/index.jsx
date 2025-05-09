import React, { useEffect, useState } from "react";
import useMyStore from "../../Store/index";
import EditProfileFormBox from "../EditProfileFormBox";
import Venues from "../Venues";
import VMBookings from "../VMBookings";






const ProfileVenueManager = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const { userProfile, vmVenues, vmBookings } = useMyStore(); 
  const { fetchVMBookings } = useMyStore();
  const {fetchVMVenues} = useMyStore();
  const [selectedView, setSelectedView] = useState("");
  console.log("Store state:", useMyStore.getState());
  useEffect(() => {
    console.log("Fetching venues...");
    fetchVMVenues();
  }, [successMessage]);

  if (!userProfile) {
    return <p>No profile data available, please log in again.</p>;
  }

  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);

  return (
    <div>
      <h1>{selectedView}</h1>
      <h2>{userProfile.data.name}</h2>
      <p>{userProfile.data.bio}</p>
      <img src={userProfile.data.banner.url} alt="banner" />
      <img src={userProfile.data.avatar.url} alt="avatar" />
      <div>
        <button
          onClick={() => {
            setSelectedView("Edit Profile");
            setIsEditProfileVisible(!isEditProfileVisible);
          }}
        >
          {isEditProfileVisible ? "Close Edit Profile" : "Edit Profile"}
        </button>
        <button
          onClick={() => {
            setSelectedView("Venues");
            if (!vmVenues.length) fetchVMVenues();
          }}
        >
          Venues
        </button>
        <button onClick={() => {setSelectedView("Bookings"); if (!vmBookings) fetchVMBookings()}}>Bookings</button>
      </div>

      <div>
        {isEditProfileVisible && <EditProfileFormBox />}
        {selectedView === "Venues" && (
          <Venues
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            vmVenues={vmVenues}
          />
        )}

        {selectedView === "Bookings" && (
          <VMBookings
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            vmBookings={vmBookings}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileVenueManager;
