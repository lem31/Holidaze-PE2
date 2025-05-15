import useMyStore from "../../Store/index";
async function postBooking(bookingData) {

  const token = localStorage.getItem("token");
  

  console.log("Token from localStorage:", token);
  if (!token) {
    console.error("Token not found in localStorage");
    throw new Error("Token not found in localStorage");
  }

  const API_URL = "https://v2.api.noroff.dev/holidaze/bookings";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "f920c7be-b352-412a-bfe3-67cf36aebe41",
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error("Failed to post booking");
    }
    const data = await response.json();

    useMyStore
      .getState()
      .setVmBookings([...useMyStore.getState().vmBookings, data]);
    localStorage.setItem(
      "vmBookings",
      JSON.stringify(useMyStore.getState().vmBookings)
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export default postBooking;
