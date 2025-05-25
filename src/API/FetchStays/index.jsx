/**
 * Fetches a list of stays (venues) from the Holidaze API with booking information.
 * Retrieves multiple pages and combines the results into a single array.
 *
 * @async
 * @function fetchStays
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of stay objects.
 * @throws {Error} Throws an error if the fetch operation fails.
 */

const fetchStays = async () => {
  try {
    const pageCount = 10;
    const limit = 20;

    const requests = Array.from({ length: pageCount }, (_, i) =>
      fetch(
        `https://v2.api.noroff.dev/holidaze/venues?_bookings=true&limit=${limit}&page=${i + 1}&sort=created&sortOrder=desc`
      ).then((response) => response.json())
    );

    const results = await Promise.all(requests);
    const stays = results.flatMap((data) => data.data || []);

    return stays;
  } catch (error) {
    console.error("Error fetching stays:", error);
    throw new Error(error.message || "Failed to fetch stays");
  }
};

export default fetchStays;
