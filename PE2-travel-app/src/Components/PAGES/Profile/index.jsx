import {useState, useEffect} from "react";
import ProfileVenueManager from "../../ProfileVenueManager";
import ProfileCustomer from "../../ProfileCustomer";
import useMyStore from "../../../Store";

function Profile() {
  const { fetchUserProfile } = useMyStore();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const profileData = await fetchUserProfile();
      setUserProfile(profileData);
      console.log("Fetched User Profile:", profileData);
    };
    
    getProfile();
  }, []);

  if (
    !userProfile ||
    !userProfile.data ||
    typeof userProfile.data.venueManager !== "boolean"
  ) {
    return <div>Invalid role</div>;
  }

  console.log(userProfile.data.venueManager);
  console.log(userProfile.data);


  return (
    <div>
      {userProfile.data.venueManager ? (
        <ProfileVenueManager />
      ) : (
        <ProfileCustomer />
      )}
    </div>
  );
}

export default Profile;
