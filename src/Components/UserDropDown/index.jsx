/**
 * UserDropDown component renders a dropdown menu for user profile and logout options.
 *
 * @component
 * @returns {JSX.Element} The UserDropDown component containing user profile and logout options.
 *
 * This component displays the user's name, username, and provides options to view the profile
 * and log out. It uses images for the profile and logout icons.
 */

import Profile from "../../assets/Images/Profile.png";
import Logout from "../../assets/Images/Logout.png";
import useMyStore from "../../Store";

import hStyles from "../../CSS_Modules/Header/header.module.css";
import { useNavigate } from "react-router-dom";

function UserDropDown({ isOpen }) {
  const { userProfile } = useMyStore((state) => state);
  const logout = useMyStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return isOpen ? (
    <div className={hStyles.dropDownBox}>
      <div className={hStyles.profileInfoBox}>
        <div className={hStyles.avatarBox}>
          {userProfile?.avatar?.url && (
            <img
              className={hStyles.navIcons}
              src={userProfile.avatar.url}
              alt="User Avatar"
            />
          )}
        </div>
        <div className={hStyles.userNameBox}>
          <p className={hStyles.labelWhite}>{userProfile.name}</p>
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
  ) : null;
}

export default UserDropDown;
