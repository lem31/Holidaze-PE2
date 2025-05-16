import Profile from '../../assets/Images/Profile.png';
import Logout from '../../assets/Images/Logout.png';
import useMyStore from '../../Store';
// import {useNavigate} from 'react-router-dom';
import hStyles from '../../CSS_Modules/Header/header.module.css';



/**
 * UserDropDown component renders a dropdown menu for user profile and logout options.
 *
 * @component
 * @returns {JSX.Element} The UserDropDown component containing user profile and logout options.
 *
 * This component displays the user's name, username, and provides options to view the profile
 * and log out. It uses images for the profile and logout icons.
 */

function UserDropDown() {

const {userProfile} = useMyStore((state) => state);
    const logout = useMyStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return(
<div className={hStyles.dropDownBox}>
{/* <img src="
" alt="" /> */}
<div className={hStyles.profileInfoBox}>
<img src={userProfile.data.avatar.url} ></img>
<p className= {hStyles.labelWhite}>{userProfile.data.name}</p>
</div>

<img className={hStyles.navIcons} src={Profile} alt="Profile Image" />
<a className={hStyles.navLink} href="/MyProfile">Profile</a>
<a className={hStyles.navLink} href='' onClick= {handleLogout}>
<img className={hStyles.navIcons} src={Logout} alt="Logout Icon" />Logout</a>

</div>
    )
}

export default UserDropDown;