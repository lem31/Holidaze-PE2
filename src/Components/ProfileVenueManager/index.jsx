import React, { useEffect, useState } from "react";
import useMyStore from "../../Store/index";
import EditProfileFormBox from "../EditProfileFormBox";
import Venues from "../Venues";
import VMBookings from "../VMBookings";
import { Snackbar, Alert } from "@mui/material";
import ProfileGlobal from "../ProfileGlobal";
import vmProfileStyles from "../../CSS_Modules/VM_Profile/vmProfile.module.css";
import gStyles from "../../CSS_Modules/Global/global.module.css";

const ProfileVenueManager = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const { userProfile, vmVenues, vmBookings, fetchVMVenues, fetchVMBookings } =
    useMyStore();
  const [selectedView, setSelectedView] = useState("");
  const [bookings, setVMBookings] = useState([]);
const [selected, setSelected] = useState(false);




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
      <div>
<ProfileGlobal
       
          setSelectedView={setSelectedView}
          selectedView={selectedView}
          userProfile={userProfile}
        />
        <div className={vmProfileStyles.buttonDiv}>
        <button
        className={selectedView === 'Venues' ? gStyles.buttonSecondary : gStyles.buttonPrimary}
          onClick={() => {
            setSelectedView("Venues");
            if (!vmVenues.length) fetchVMVenues();
          }}
        >
          Venues
        </button>
        <button
                className={selectedView === 'Bookings' ? gStyles.buttonSecondary : gStyles.buttonPrimary}
          onClick={() => {
            setSelectedView("Bookings");
            fetchVMBookings();
          }}
        >
          Bookings
        </button>
        </div>
      </div>

      <div>
     
     
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
