import {useState, useEffect} from "react";
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
      console.log("🔍 Full Profile API Response:", profileData);
      if (profileData) {
        setUserProfile(profileData.data);
        console.log("Fetched User Profile:", profileData);
      } else {
        console.error("Failed to fetch user profile: Profile data is undefined");
      }
    };
    
    getProfile();
  }, []);

  if (
    !userProfile ||
    typeof userProfile.venueManager !== "boolean"
  ) 
  if (!isLoggedIn) {
    return;} else {
    return <div>Invalid role</div>;
  }

 


  return (
    <div>
      {userProfile.venueManager ? (
        <ProfileVenueManager />
      ) : (
        <ProfileCustomer />
      )}
    </div>
  );
}

export default Profile;
