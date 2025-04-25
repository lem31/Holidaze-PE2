const url = "https://v2.api.noroff.dev/holidaze/venues";

const fetchStays = async (set) => {
  set({ loading: true, error: false });
  try {
    const response = await fetch(url); 
    const data = await response.json();
    set({ stays: data.data, loading: false });
  } catch (error) {

    set({errorMessage: error.message|| 'Failed to fetch stays'});
    set({ loading: false, error: true });
  }
};

export default fetchStays;