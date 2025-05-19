import Profile from "../../assets/Images/Profile.png";
import Logout from "../../assets/Images/Logout.png";
import useMyStore from "../../Store";
// import {useNavigate} from 'react-router-dom';
import hStyles from "../../CSS_Modules/Header/header.module.css";

/**
 * UserDropDown component renders a dropdown menu for user profile and logout options.
 *
 * @component
 * @returns {JSX.Element} The UserDropDown component containing user profile and logout options.
 *
 * This component displays the user's name, username, and provides options to view the profile
 * and log out. It uses images for the profile and logout icons.
 */

function UserDropDown({isOpen}) {
  const { userProfile } = useMyStore((state) => state);
  const logout = useMyStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return isOpen ? (
    <div className={hStyles.dropDownBox}>
  
      <div className={hStyles.profileInfoBox}>
        <div className={hStyles.avatarBox}>
          <img
            className={hStyles.navIcons}
            src={userProfile.data.avatar.url}
            alt="User Avatar"
          ></img>
        </div>
        <div className={hStyles.userNameBox}>
          <p className={hStyles.labelWhite}>{userProfile.data.name}</p>
        </div>
      </div>
      <div className={hStyles.profileLinkBox}>
        <div className={hStyles.profileLinkWrapper}>
          <img className={hStyles.navIcons} src={Profile} alt="Profile" />
          <a className={hStyles.navLinkWhite} href="/MyProfile">
            Profile
          </a>
        </div>

        <div className={hStyles.profileLinkWrapper}>
          <img className={hStyles.navIcons} src={Logout} alt="Logout" />
          <a className={hStyles.navLinkWhite} href="" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </div>
  ): null;
}

export default UserDropDown;
