import React from 'react';
import Profile from '../../assets/Images/Profile.png';
import Logout from '../../assets/Images/Logout.png';

/**
 * UserDropDown component renders a dropdown menu for user profile and logout options.
 * 
 * @component
 * @returns {JSX.Element} The UserDropDown component containing user profile and logout options.
 * 
 * This component displays the user's name, username, and provides options to view the profile
 * and log out. It uses images for the profile and logout icons.
 */

function UserDropDown(){
    return(
<div>
{/* <img src="
" alt="" /> */}
<p>Name</p>
<p>Username</p>
<img src={Profile} alt="" />
<p>Profile</p>
<img src={Logout} alt="" />
<p>Logout</p>

</div>
    )
}

export default UserDropDown;