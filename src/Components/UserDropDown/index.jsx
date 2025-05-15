import React from 'react';
import Profile from '../../assets/Images/Profile.png';
import Logout from '../../assets/Images/Logout.png';
import useMyStore from '../../Store';
import {useNavigate} from 'react-router-dom';

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

    const logout = useMyStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return(
<div>
{/* <img src="
" alt="" /> */}
<p>Name</p>
<p>Username</p>

<img src={Profile} alt="Profile Image" />
<a href="/MyProfile">Profile</a>
<a href='' onClick= {handleLogout}>
<img src={Logout} alt="Logout Icon" />Logout</a>

</div>
    )
}

export default UserDropDown;