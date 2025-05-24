import React, {useState} from 'react';
import LoginBox from '../../LoginBox';
import {useLocation, Navigate} from 'react-router-dom';
import {Snackbar, Alert} from '@mui/material';
import useMyStore from '../../../Store';

/**
 * Login component renders the login page.
 * It includes a title and the LoginBox component for user login.
 * @returns {JSX.Element} The rendered component.
 * @component
 * @example
 * return (
 *  <Login />
 * );
 */

function Login() {
  const location = useLocation();

  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || null);
  const isLoggedIn = useMyStore((state) => state.isLoggedIn);

if (isLoggedIn) {
    return <Navigate to="/MyProfile" />;
  };
  return (
    
    <div>
      <div  style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            height: "auto",
          }}>
      {successMessage && (

        
                <Snackbar open={Boolean(successMessage)} autoHideDuration={3000} onClose={() => {setSuccessMessage(null)} } anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
    
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1500,
                  width: "400px",
                  height: "auto",
                  backgroundColor: "transparent",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}>
                    <Alert severity="success"  onClose={() => setSuccessMessage(null)}>{successMessage}</Alert>
                </Snackbar>
            )}
            </div>
            

        <LoginBox />
    </div>
  );
}
export default Login;