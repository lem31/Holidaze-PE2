import Logo from '../../assets/Images/Logo.png';
import Stays from '../../assets/Images/Stays.png';
import Register from '../../assets/Images/Register.png';
import Login from '../../assets/Images/Login.png';
import Account from '../../assets/Images/Account.png';
import Hamburger from '../../assets/Images/Hamburger.png';
import UserDropDown from '../UserDropDown';
import  useMyStore from '../../Store';
import {useState, useEffect} from 'react';
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
const  [isDropDownOpen, setIsDropDownOpen] = useState(false);
const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

useEffect(() => {

  const closeAccountMenu = (event) => {
    if (
      !event.target.closest(`.${hStyles.accountDiv}`) &&
      !event.target.closest(`.${hStyles.dropDownBox}`)
    ) {
      setIsDropDownOpen(false);
    }
  };
  
  const closeMenu = (event) => {
    if (!event.target.closest(`.${hStyles.nav}`) && !event.target.closest(`.${hStyles.hamburgerButton}`)) {
      setIsMobileNavOpen(false);
    }
  };
  document.addEventListener("click", closeMenu, closeAccountMenu);
  return () => document.removeEventListener("click", closeMenu);
}, []);



  return(
    <div className={hStyles.headerDiv} >
   <header className={hStyles.header}>
    <div className={hStyles.logoMenuDiv}>
    <div className={hStyles.logoDiv}>
<img src={Logo} alt="Logo" className={hStyles.logo}/>
</div>
<div>
 <button className={hStyles.hamburgerButton}     onClick={() => setIsMobileNavOpen(prevState => !prevState)}>
<img src={Hamburger} alt="Hamburger Menu Icon"  />
</button>
</div>
</div>
<nav className={hStyles.nav}>
    <div className={hStyles.navDiv}>
  <a className={hStyles.navLink} href="/"> <img className={hStyles.navIcons} src={Stays} alt="Stays Icon" />Stays</a>
    {!isLoggedIn && (
      <>
    <a className={hStyles.navLink} href="/Register"><img className={hStyles.navIcons} src={Register} alt="Register Icon" />Register</a>
      <a className={hStyles.navLink} href="/Login"> <img className={hStyles.navIcons} src={Login} alt="Login Icon" />Login</a>
      </>
    )}
  </div>
 
{isMobileNavOpen && (

<div className={`${hStyles.mobileNavDiv} ${isMobileNavOpen ? hStyles.active : ''}`}>
<a className={hStyles.navLink} href="/">
    <img className={hStyles.navIcons} src={Stays} alt="Stays Icon" />Stays</a>
   {!isLoggedIn && (
    <>
<a className={hStyles.navLink}  href="/Register"> <img className={hStyles.navIcons} src={Register} alt="Register Icon" />Register</a>
<a className={hStyles.navLink}  href="/Login"> <img className={hStyles.navIcons}  src={Login} alt="Login Icon" />Login</a> </>)}

</div>

)}
</nav>

{isLoggedIn &&(

    <div className={hStyles.accountDiv} >
<div className={hStyles.accountBox}>
  <button className={hStyles.accountIcon} onClick={() => {
      setIsDropDownOpen(prevState => !prevState); 
      console.log('Dropdown Toggled', !isDropDownOpen);
        }}>
<img className={hStyles.navIcons} src={Account} alt="Account Dropdown Options Icon" />
</button>
</div>



</div>

)}

   </header>
{isDropDownOpen &&
 
    <UserDropDown isOpen={isDropDownOpen}  />
 
}
   </div>

  )
}

export default Header;

