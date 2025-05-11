import React from "react";



const ProfileGlobal= ({setIsEditProfileVisible, setSelectedView, selectedView, userProfile}) => { 
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
      </div>
    </div>
  );
}

export default ProfileGlobal;