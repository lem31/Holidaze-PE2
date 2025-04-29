import React from 'react';
import Register from '../../assets/Images/Register.png';
import Login from '../../assets/Images/Login.png';
import Facebook from '../../assets/Images/Facebook.png';
import Twitter from '../../assets/Images/Twitter.png';
import Instagram from '../../assets/Images/Instagram.png';

/**
 * Footer component renders the footer section of the application.
 * It includes links to the registration and login pages,
 * as well as social media icons for Facebook, Instagram, and Twitter.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @example
 * 
 */

function Footer() {
    return(
    <div>
        <footer>
<p>© 2025 Holidaze  </p>
<a href="/Register">
<img src={Register} alt="Register icon" />
Register
</a>
<a href="/Login">
<img src={Login} alt="Login icon" />
Login
</a>

<div>
<img src={Facebook} alt="Facebook icon" />
<img src={Instagram} alt="Instagram icon" />
<img src={Twitter} alt="Twitter icon" />
</div>
        </footer>
    </div> ) }

    export default Footer;
