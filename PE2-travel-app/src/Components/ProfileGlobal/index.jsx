import React, {useState} from "react";
import useMyStore from "../../Store/index";
import DefaultImage from '../../assets/Images/DefaultBannerProfileImg.jpg';
import EditProfileFormBox from "../EditProfileForm";



const ProfileGlobal= () => { 
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
const { userProfile } = useMyStore();

const [refresh, setRefresh] = React.useState(false);
React.useEffect(() => {
  console.log('profile updated, forcing refresh');
}, [refresh]);
  return (
    <div>
    
   
    <h2>{userProfile.data.name}</h2>
    <p>{userProfile.data.bio}</p>
    <img src={userProfile.data.banner?.url || DefaultImage } alt="banner" />
    <img src={userProfile.data.avatar?.url || DefaultImage } alt="avatar" />
    <div>
      <button
        onClick={() => {
         
      setIsEditProfileVisible(true); 
        }}
      >
        Edit Profile
      </button>

      {isEditProfileVisible && (
          <EditProfileFormBox
          toggleForm={() => setIsEditProfileVisible(false)}
          setSuccessMessage={setSuccessMessage}
          successMessage={successMessage}
          isEditProfileVisible={isEditProfileVisible}
          setIsEditProfileVisible={setIsEditProfileVisible}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileGlobal;