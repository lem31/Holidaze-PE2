import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMyStore from "../../../Store";
import ProfileVenueManager from "../../ProfileVenueManager";

function Profile() {
  const { loginChecked, isLoggedIn, checkLoginStatus } = useMyStore();
  const navigate = useNavigate();


  useEffect(() => {
    if (!loginChecked) {
      checkLoginStatus();
    }
  }, [loginChecked, checkLoginStatus]);


  useEffect(() => {
    if (loginChecked && !isLoggedIn) {
      console.error("Session expired. Redirecting to login...");
      navigate("/Login"); 
    }
  }, [loginChecked, isLoggedIn, navigate]);

  if (!loginChecked) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <div>
      <ProfileVenueManager />
    </div>
  );
}

export default Profile;
