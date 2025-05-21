import Register from '../../assets/Images/Register.png';
import Login from '../../assets/Images/Login.png';
import Facebook from '../../assets/Images/Facebook.png';
import Twitter from '../../assets/Images/Twitter.png';
import Instagram from '../../assets/Images/Instagram.png';
import useMyStore from '../../Store';
import footerStyles from '../../CSS_Modules/Footer/footer.module.css';

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
     const isLoggedIn = useMyStore((state) => state.isLoggedIn);
    return(
    <div className={footerStyles.footerDiv}>
        <footer className={footerStyles.footer}> 
            <div className={footerStyles.crDiv}>
<p className={footerStyles.copyRight}>© 2025 Holidaze  </p>
<a href="https://icons8.com/" className={footerStyles.copyRight}> Icons by icons 8</a>
</div >
  {!isLoggedIn && (
    <nav className={footerStyles.registerLoginNav}>
        <div  className={footerStyles.Ul}>
<a className={footerStyles.footerA} href="/Register">
<img className={footerStyles.navIcons} src={Register} alt="Register icon" />
Register
</a>
<a href="/Login"  className={footerStyles.footerA} >
<img className={footerStyles.navIcons} src={Login} alt="Login icon" />
Login
</a>
        </div>

</nav>
    )}
    

<div className={footerStyles.smIconsDiv}>
<img className={footerStyles.smIcons} src={Facebook} alt="Facebook icon" />
<img className={footerStyles.smIcons} src={Instagram} alt="Instagram icon" />
<img className={footerStyles.smIcons} src={Twitter} alt="Twitter icon" />
</div>
        </footer>
    </div> ) }

    export default Footer;
