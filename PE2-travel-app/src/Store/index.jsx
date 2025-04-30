import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { persist } from "zustand/middleware";
import fetchStays from "../API/index.jsx";
import fetchUserProfile from "../API/FetchUserProfile/index.js";
import fetchVMVenues from "../API/FetchVMVenues";

const useMyStore = create(
  persist(
    (set, get) => ({
      stays: [],
      selectedStay: null,
      token: null,
      userName: null,
      isLoggedIn: false,
      userProfile: null,
      loadingProfile: false,
      loginChecked: false,
      vmVenues: [],

   
      login: (newToken, userName) => {
        set({ token: newToken, userName, isLoggedIn: true });
        console.log("Login state persisted successfully.");
      },

      setUserProfile: (profileData) => {
        set({ userProfile: profileData });
        console.log("User profile persisted successfully.");
      },


      logout: () => {
        set({ token: null, userName: null, userProfile: null, isLoggedIn: false });
        console.log("User logged out successfully.");
      },


      checkLoginStatus: () => {
        const token = get().token;
        const userName = get().userName;

        console.log("Restored token:", token);
        console.log("Restored username:", userName);

        if (token && userName) {
          set({ isLoggedIn: true, loginChecked: true });
          console.log("Login state restored successfully.");
        } else {
          set({ isLoggedIn: false, loginChecked: true });
          console.log("No login state found.");
        }
      },
    


      fetchUserProfile: async () => {
        try {
          const token = get().token;
          const userName = get().userName;

          if (!token || !userName) {
            console.error("Token or username not found in local storage.");
            return;
          }

          set({ loadingProfile: true });
          console.log("Fetching user profile...");

          const profileData = await fetchUserProfile(userName, token);
          if (profileData) {
            console.log("Profile data fetched:", profileData);
            set({ userProfile: profileData, loadingProfile: false });
            return profileData;
          } else {
            throw new Error("Failed to fetch profile data.");
          }
        } catch (error) {
          set({ userProfile: null, loadingProfile: false });
          console.error("Error fetching user profile:", error);
          throw error;
        }
      },


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


      fetchVMVenues: async () => {
        const token = get().token;
        const userName = get().userName;
        if (!token || !userName) {
          console.error("Token or username not found in local storage.");
          set({error: "Token or username not found in local storage.", loading: false});
          return;
        }
        set({ loading: true, error: false });

        try {
          const venues = await fetchVMVenues(userName, token);
          set({ vmVenues: venues, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
          console.error("Error fetching venues:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (key) => JSON.parse(localStorage.getItem(key)), 
        setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)), 
        removeItem: (key) => localStorage.removeItem(key),
      },
    }
  )
);

export default useMyStore;
