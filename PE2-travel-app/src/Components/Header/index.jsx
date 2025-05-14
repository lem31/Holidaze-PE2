import React, { use } from 'react';
import Logo from '../../assets/Images/Logo.png';
import Stays from '../../assets/Images/Stays.png';
import Register from '../../assets/Images/Register.png';
import Login from '../../assets/Images/Login.png';
import Account from '../../assets/Images/Account.png';
import Hamburger from '../../assets/Images/Hamburger.png';
import UserDropDown from '../UserDropDown';
import  useMyStore from '../../Store';

/**
 *
 * @returns {JSX.Element} The Header component containing the logo, navigation links, and user account options.
 *
 * This component renders the header section of the application, including the logo,
 * navigation links for "Stays", "Register", and "Login", as well as a user account icon.
 * The user account icon is accompanied by a dropdown menu for user profile and logout options.
 */

function Header() {
    const isLoggedIn = useMyStore((state) => state.isLoggedIn);

  return(
    <div>

   <Header>
<img src={Logo} alt="Logo" className="logo"/>
<nav>
  <button>
<img src={Hamburger} alt="Hamburger Menu Icon" className="hamburger" />
</button>
<ul>
<li>
    <img src={Stays} alt="Stays Icon" /><a href="/">Stays</a></li>
   {!isLoggedIn && (
    <>
<li> <img src={Register} alt="Register Icon" /><a href="/Register">Register</a></li>
<li> <img src={Login} alt="Login Icon" /><a href="/Login">Login</a></li> </>)}

</ul>
</nav>

{isLoggedIn &&(

    <div>

<img src={Account} alt="Account Dropdown Options Icon" />
<UserDropDown/>

</div>

)}

   </Header>

   </div>

  )
}

export default Header;

