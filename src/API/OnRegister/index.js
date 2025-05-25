async function onRegister(endpoint, userData) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

     const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Registration failed");
    }

   

    return data;
  } catch (error) {
        console.error("API Registration Error:", error);
    throw error;
  }
}
export default onRegister;
