import { useEffect, useMemo } from "react";
import Router from "./Components/Router";
import useMyStore from "./Store";

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
  const { checkLoginStatus, loginChecked } = useMyStore();
  const isHydrated = useMemo(() => useMyStore.persist.hasHydrated(), []);


  useEffect(() => {
    if (isHydrated && !loginChecked) {
      checkLoginStatus();
      console.log("Login status checked");

    }
  }, [isHydrated, checkLoginStatus]);

  return ( <Router />
  );
}

export default App;
