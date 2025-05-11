import React from "react";
import ProfileVenueManager from "../../ProfileVenueManager";
import ProfileCustomer from "../../ProfileCustomer";
import useMyStore from "../../../Store";

function Profile() {
  const { userProfile } = useMyStore();
  console.log(userProfile);

  if (
    !userProfile ||
    !userProfile.data ||
    typeof userProfile.data.venueManager !== "boolean"
  ) {
    return <div>Invalid role</div>;
  }
  console.log(userProfile.data.venueManager);

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
