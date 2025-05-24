import useMyStore from "../../Store/index";
import { jwtDecode } from "jwt-decode";
import fetchUserProfile from "../../API/FetchUserProfile/index";

async function onLogin(endpoint, userData, navigate) {
  const { login, setUserProfile } = useMyStore.getState();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
          const errorData= await response.json();
       console.error("Login failed:", errorData);
       return errorData;
     
  

    }

    const data = await response.json();
   
    const accessToken = data?.data?.accessToken;
    const userName = data?.data?.name;

    if (accessToken && userName) {
      const decodedToken = jwtDecode(accessToken);

      login(accessToken, userName);

      const profileData = await fetchUserProfile(userName, accessToken);
      if (profileData) {
        setUserProfile(profileData.data);
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
