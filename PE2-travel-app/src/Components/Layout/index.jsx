import React from 'react';
import {Outlet} from "react-router-dom";
// import Header from "../Header";
// import Footer from "../Footer";
// import styles from '../../CSS_Modules/Layout/layout.module.css';

/**
 * Layout component is a wrapper for the application's layout structure.
 * It uses React Router's Outlet component to render child routes dynamically.
 * 
 * @component
 * @returns {JSX.Element} The layout structure containing child routes.
 */

function Layout(){
return(
  <div>
   
  {/* <Header/> */}
 
  <Outlet/>
  
  {/* <Footer/> */}
 
  </div>
 
);
}

export default Layout;