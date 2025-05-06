export const createVenue = async (venueData) => {
    const API_URL = "https://v2.api.noroff.dev/holidaze/venues";
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("No token found! API request skipped.");
        return;
    }

    try {
        console.log("📡 Sending API request...");
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'X-Noroff-API-Key': 'f920c7be-b352-412a-bfe3-67cf36aebe41',
            },
            body: JSON.stringify(venueData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to post venue: ${errorMessage}`);
        }

        const data = await response.json();
        console.log("Venue created successfully:", data);
        return data;
    } catch (error) {
        console.error("Error creating venue:", error);
        throw error;
    }
};


export default createVenue;
