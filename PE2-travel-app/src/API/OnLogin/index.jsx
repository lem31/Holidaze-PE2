import useMyStore from "../../Store";
import jwtDecode from "jwt-decode";


async function onLogin(endpoint, userData) {
    const {login} = useMyStore.getState();
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to Login user");
      }
  
      const data = await response.json();

      if(data.token){
        const decodedToken = jwtDecode(data.token);
        console.log('Token decoded:", decodedToken);')
    
        login(data.token);
        console.log("Login successful and token stored:", decodedToken);}
        else{
            throw new Error("Token not found in response"); 
        }
return data;
    } catch(error){
        throw new Error("Login failed: " + error.message);
    }};
  
  export default onLogin;
  