/**
 * Profile component that fetches and displays the user's profile information.
 * Renders either the ProfileVenueManager or ProfileCustomer component based on the user's role.
 *
 * @component
 * @returns {JSX.Element|null} The rendered profile page or null if not logged in.
 */

import { useState, useEffect } from "react";
import ProfileVenueManager from "../../ProfileVenueManager";
import ProfileCustomer from "../../ProfileCustomer";
import useMyStore from "../../../Store";

function Profile() {
  const { fetchUserProfile } = useMyStore();
  const [userProfile, setUserProfile] = useState(null);
  const isLoggedIn = useMyStore((state) => state.isLoggedIn);

  useEffect(() => {
    const getProfile = async () => {
      const profileData = await fetchUserProfile();

      if (profileData) {
        setUserProfile(profileData);
      } else {
        console.error(
          "Failed to fetch user profile: Profile data is undefined"
        );
      }
    };

    getProfile();
  }, []);

  if (!userProfile || typeof userProfile.venueManager !== "boolean")
    if (!isLoggedIn) {
      return;
    } else {
      return <div>Invalid role</div>;
    }

  return (
    <div>
      {userProfile.venueManager ? <ProfileVenueManager /> : <ProfileCustomer />}
    </div>
  );
}

export default Profile;
