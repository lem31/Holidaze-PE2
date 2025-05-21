import React, {useState} from "react";
import useMyStore from "../../Store/index";
import DefaultImage from '../../assets/Images/DefaultBannerProfileImg.jpg';
import EditProfileFormBox from "../EditProfileForm";
import {Snackbar, Alert} from "@mui/material";
import gStyles from '../../CSS_Modules/Global/global.module.css';
import profileStyles from '../../CSS_Modules/Profile/profile.module.css';



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
      <div className={profileStyles.bannerAvatarDiv}>
        <div className={profileStyles.bannerDiv}>
    <img src={userProfile.banner?.url || DefaultImage } alt="banner" />
    </div>
    <img className={profileStyles.avatar} src={userProfile.avatar?.url || DefaultImage } alt="avatar" />
    </div>

    <div className={profileStyles.profileInfoDiv}>
   <h1 className= {gStyles.h1Black}>My Profile</h1>

    <p className={gStyles.bodyBlack}>{userProfile.name}</p>
    <p>{userProfile.bio}</p>

  
 
      <button className= {gStyles.buttonPrimary}
        onClick={() => {
         
      setIsEditProfileVisible(true); 
        }}
      >
        Edit Profile
      </button>
      </div>

       <div>
            <div  style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                  height: "auto",
                }}>
            {successMessage && (
      
              
                      <Snackbar open={Boolean(successMessage)} autoHideDuration={3000} onClose={() => {setSuccessMessage(null)} } anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
                      }}>
                          <Alert severity="success"  onClose={() => setSuccessMessage(null)}>{successMessage}</Alert>
                      </Snackbar>
                  )}
                  </div>
                  

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