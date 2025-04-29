import useMyStore from "../../Store/index";
import { jwtDecode } from "jwt-decode";

async function onLogin(endpoint, userData, navigate) {
  const { login } = useMyStore.getState();
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
    const userName = data.data.name;

    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      console.log('Token decoded:", decodedToken);');
      login(accessToken, userName);
      navigate("/MyProfile");

      console.log("Login successful and token stored:", decodedToken);
    } else {
      throw new Error("Token not found in response");
    }
    return data;
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
}

export default onLogin;
