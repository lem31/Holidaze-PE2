import useMyStore from "../../Store/index";
import { jwtDecode } from "jwt-decode";
import fetchUserProfile from "../../API/FetchUserProfile/index"; 

async function onLogin(endpoint, userData, navigate) {
  const { login, setUserProfile } = useMyStore.getState(); 
  console.log("onLogin called with endpoint:", endpoint);
  console.log("onLogin called with userData:", userData);

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
    const accessToken = data?.data?.accessToken;
    const userName = data?.data?.name;

    if (accessToken && userName) {
      const decodedToken = jwtDecode(accessToken);
      console.log("Token decoded:", decodedToken);

    
      login(accessToken, userName);
      console.log("Login successful and token stored:", decodedToken);

     
      console.log("Fetching user profile...");
      const profileData = await fetchUserProfile(userName, accessToken);
      if (profileData) {
        console.log("Profile fetched successfully:", profileData);
        setUserProfile(profileData); 
      } else {
        console.warn("Failed to fetch user profile data.");
      }

      navigate("/MyProfile");
    } else {
      throw new Error("Token or username not found in response");
    }

    return data;
  } catch (error) {
    console.error("Login failed:", error.message || error);
    throw new Error(`Login failed: ${error.message}`);
  }
}

export default onLogin;
