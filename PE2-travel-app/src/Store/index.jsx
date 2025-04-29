import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import fetchStays from "../API/index.jsx";
import fetchUserProfile from "../API/FetchUserProfile/index.js";
import fetchVMVenues from "../API/FetchVMVenues/index.js";

const useMyStore = create((set, get) => ({
  stays: [],
  selectedStay: null,
  token: null,
  isLoggedIn: false,

  fetchStays: async () => {
    try {
      set({ loading: true, error: false });
      const fetchedStays = await fetchStays();
      set({ stays: fetchedStays, loading: false });
      return fetchedStays;
    } catch (error) {
      set({
        loading: false,
        error: true,
        errorMessage: error.message || "Failed to fetch stays",
      });
    }
  },
  



  fetchAndSetSelectedStay: async (stayId) => {
    const { stays, fetchStays } = get();
    let selectedStay = JSON.parse(localStorage.getItem("selectedStay"));

    if (selectedStay?.id === stayId) {
      set({ selectedStay });
    } else if (stays.length > 0) {
      selectedStay = stays.find((stay) => stay.id === stayId);
      if (selectedStay) {
        localStorage.setItem("selectedStay", JSON.stringify(selectedStay));
        set({ selectedStay });
      } else {
        throw new Error("Stay not found");
      }
    } else {
      await fetchStays();
      const updatedStays = get().stays;
      selectedStay = updatedStays.find((stay) => stay.id === stayId);
      if (selectedStay) {
        localStorage.setItem("selectedStay", JSON.stringify(selectedStay));
        set({ selectedStay });
      } else {
        throw new Error("Stay not found");
      }
    }
  },
  setSelectedStay: (stay) => {
    localStorage.setItem("selectedStay", JSON.stringify(stay));
    set({ selectedStay: stay });
  },

  // fetchStays: () => fetchStays(set),
  // setStays: (stays) => set({ stays }),
  // setSelectedStay: (stay) => {localStorage.setItem('selectedStay', JSON.stringify(stay));
  // set({ selectedStay: stay })},

  login: (newToken, userName) => {
    localStorage.setItem("token", newToken);
    console.log("Token stored in local storage:", newToken);
    localStorage.setItem("userName", userName);
    console.log("User name stored in local storage:", userName);
    set({ token: newToken, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, isLoggedIn: false });
  },

  checkLoginStatus: () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isTokenValid = decoded.exp * 1000 > Date.now();
        if (isTokenValid) {
          set({ token, isLoggedIn: true });
        } else {
          set({ token: null, isLoggedIn: false });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        set({ token: null, isLoggedIn: false });
      }
    }
  },

  fetchUserProfile: async () =>{
    try{
      const token = get().token;
      if(!token){
        throw new Error("User not authenticated");
      }
     const userName= localStorage.getItem("userName");
     if(!userName){
        throw new Error("User name not found in local storage");
      }

      const profileData= await fetchUserProfile(userName, token);
      console.log("Profile data fetched:", profileData);
      set({userProfile:profileData});
      return profileData;
    } catch(error){
      set({ userProfile: null});
      throw new Error("Failed to fetch user profile");
    }
  },
fetchVMVenues: async () => {
  set({ loading: true, error: false });
  
  try{
    const venues = await fetchVMVenues();
    set({vmVenues: venues, loading: false});
  } catch(error){
    set({error: error.message, loading: false});
    console.error("Error fetching venues:", error);
  }
  
},



}));

export default useMyStore;
