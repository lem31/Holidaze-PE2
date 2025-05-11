import React from "react";
import ProfileGlobal from "../ProfileGlobal";
import DisplayCustomerBookings from "../DisplayCustomerBookings";

const ProfileCustomer = ({setIsEditProfileVisible, setSelectedView, selectedView, userProfile}) => {
  return (
    <div>
 
    <ProfileGlobal  setIsEditProfileVisible={setIsEditProfileVisible}
          setSelectedView={setSelectedView}
          selectedView={selectedView}
          userProfile={userProfile}/>

<DisplayCustomerBookings/>
    </div>

  


  );
}

export default ProfileCustomer;