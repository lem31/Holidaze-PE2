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

   
      login: (newToken, userName) => {
        set({ token: newToken, userName, isLoggedIn: true });
        console.log("Login state persisted successfully.");
      },


      logout: () => {
        set({ token: null, userName: null, isLoggedIn: false });
        console.log("User logged out successfully.");
      },


      checkLoginStatus: () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

        console.log("Restored token:", token);
  console.log("Restored username:", userName);

        if (token && userName) {
          try {
            const decoded = jwtDecode(token);
            const isTokenValid = decoded.exp * 1000 > Date.now();

            if (isTokenValid) {
              set({ isLoggedIn: true, loginChecked: true });
              console.log("Login state restored successfully.");
            } else {
              console.log("Token expired but retained in storage.");
              set({ isLoggedIn: true, loginChecked: true }); 
            }
          } catch (error) {
            console.error("Error decoding token:", error);
            set({ token: null, userName: null, isLoggedIn: false, loginChecked: true });
          }
        } else {
          console.log("No login state found.");
          set({ isLoggedIn: false, loginChecked: true });
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
        set({ loading: true, error: false });

        try {
          const venues = await fetchVMVenues();
          set({ vmVenues: venues, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
          console.error("Error fetching venues:", error);
        }
      },
    }),
    {
      name: "auth-storage", 
      storage: localStorage, 
    }
  )
);

export default useMyStore;
