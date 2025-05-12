import React from "react";
import useMyStore from "../../Store/index";
import DefaultImage from '../../assets/Images/DefaultBannerProfileImg.jpg';



const ProfileGlobal= ({setIsEditProfileVisible, setSelectedView, selectedView}) => { 
const { userProfile } = useMyStore();
const [refresh, setRefresh] = React.useState(false);
React.useEffect(() => {
  console.log('profile updated, forcing refresh');
}, [refresh]);
  return (
    <div>
    
    <h1>{selectedView}</h1>
    <h2>{userProfile.name}</h2>
    <p>{userProfile.bio}</p>
    <img src={userProfile.banner?.url || DefaultImage } alt="banner" />
    <img src={userProfile.avatar?.url || DefaultImage } alt="avatar" />
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