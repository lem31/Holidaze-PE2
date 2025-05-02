async function fetchVMVenues(userName, token) {
    if (!userName || !token) {
        console.error('Invalid input: userName and token are required');
        throw new Error('Invalid input: userName and token are required');
    }

    try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}/venues`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Noroff-API-Key': 'f920c7be-b352-412a-bfe3-67cf36aebe41',
            },
        });

        if (!response.ok) {
            console.error('Failed API Response:', response);
            throw new Error('Failed to fetch user venues');
        }

        const vmVenuesData = await response.json();
        return vmVenuesData;
    } catch (error) {
        console.error('Error fetching user venues:', error);
        throw error;
    }
}

export default fetchVMVenues;

