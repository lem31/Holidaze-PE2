import React, { useEffect } from 'react';
import Router from './Components/Router'
import useMyStore from './Store ';

/**The App component is the main entry point of the application.
 * It initializes the application.
 * 
 * @component
 * @returns {JSX.Element} The main App component containing the Router component.
 * 
 * This component uses React Router to manage navigation within the application.
 * It also checks the login status of the user using a zustand store.
 */

function App() {

  const checkLoginStatus = useMyStore((state)=> state.checkLoginStatus);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);
 
  return (
    <>

  <Router/>

     </>
  );
}

export default App;
