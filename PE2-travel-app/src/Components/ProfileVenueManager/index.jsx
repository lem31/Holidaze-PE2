import React, { useEffect, useState } from "react";
import useMyStore from "../../Store/index";
import EditProfileFormBox from "../EditProfileFormBox";
import Venues from "../Venues";
import VMBookings from "../VMBookings";
import { Snackbar, Alert } from "@mui/material";

const ProfileVenueManager = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const { userProfile, vmVenues, vmBookings, fetchVMVenues, fetchVMBookings } =
    useMyStore();
  const [selectedView, setSelectedView] = useState("");
  const [bookings, setVMBookings] = useState([]);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);

  useEffect(() => {
    fetchVMVenues();
  }, [successMessage]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [successMessage]);

  useEffect(() => {
    fetchVMBookings();

    setVMBookings(vmBookings);
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [successMessage, vmBookings]);

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
        <button
          onClick={() => {
            setSelectedView("Edit Profile");
            setIsEditProfileVisible(true); 
          }}
        >
          Edit Profile
        </button>
        <button
          onClick={() => {
            setSelectedView("Venues");
            if (!vmVenues.length) fetchVMVenues();
          }}
        >
          Venues
        </button>
        <button
          onClick={() => {
            setSelectedView("Bookings");
            fetchVMBookings();
          }}
        >
          Bookings
        </button>
      </div>

      <div>
        {isEditProfileVisible && (
          <EditProfileFormBox
            toggleForm={() => setIsEditProfileVisible(false)}
            setSuccessMessage={setSuccessMessage}
            successMessage={successMessage}
            isEditProfileVisible={isEditProfileVisible}
            setIsEditProfileVisible={setIsEditProfileVisible}
          />
        )}
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
            vmVenues={vmVenues}
          />
        )}
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            height: "auto",
          }}
        >
          <Snackbar
            open={Boolean(successMessage)}
            autoHideDuration={3000}
            onClose={() => setSuccessMessage(null)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1500,
              width: "400px",
              height: "auto",
              backgroundColor: "transparent",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Alert
              severity="success"
              onClose={() => setSuccessMessage("")}
              sx={{
                fontSize: "20px",
                padding: "20px",

                textAlign: "center",
              }}
            >
              {successMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default ProfileVenueManager;
