import Logo from '../../assets/Images/Logo.png';
import Stays from '../../assets/Images/Stays.png';
import Register from '../../assets/Images/Register.png';
import Login from '../../assets/Images/Login.png';
import Account from '../../assets/Images/Account.png';
import Hamburger from '../../assets/Images/Hamburger.png';
import UserDropDown from '../UserDropDown';
import  useMyStore from '../../Store';
import hStyles from '../../CSS_Modules/Header/header.module.css';

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
    <div className={hStyles.headerDiv} >

   <header className={hStyles.header}>
<img src={Logo} alt="Logo" className={hStyles.logo}/>
<nav>
  <button className={hStyles.hamburgerButton}>
<img src={Hamburger} alt="Hamburger Menu Icon"  />
</button>
<ul className={hStyles.navUl}>
<li className={hStyles.navLi}>
    <img className={hStyles.navIcons} src={Stays} alt="Stays Icon" /><a className={hStyles.navLink} href="/">Stays</a></li>
   {!isLoggedIn && (
    <>
<li className={hStyles.navLi}> <img className={hStyles.navIcons} src={Register} alt="Register Icon" /><a className={hStyles.navLink}  href="/Register">Register</a></li>
<li className={hStyles.navLi}> <img className={hStyles.navIcons}  src={Login} alt="Login Icon" /><a className={hStyles.navLink}  href="/Login">Login</a></li> </>)}

</ul>
</nav>

{isLoggedIn &&(

    <div>

<img className={hStyles.navIcons} src={Account} alt="Account Dropdown Options Icon" />
<UserDropDown/>

</div>

)}

   </header>

   </div>

  )
}

export default Header;

