import { create } from "zustand";
import { persist } from "zustand/middleware";
import fetchStays from "../API/index.jsx";
import fetchUserProfile from "../API/FetchUserProfile/index.js";
import fetchVMVenues from "../API/FetchVMVenues";
import deleteVenue from "../API/DeleteVenue";
import updateProfile from "../API/UpdateProfile/index.js";
import { use } from "react";

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
        if (newToken) {
          localStorage.setItem("token", newToken);
        }
        if (userName) {
          localStorage.setItem("userName", userName);
        }
        set({ token: newToken, userName, isLoggedIn: true });
        console.log("Login state persisted successfully.");
      },

      setUserProfile: (profileData) => {
        set({ userProfile: profileData });
        console.log("userProfile", profileData);
        console.log("User profile persisted successfully.");
      },

  

      logout: () => {
        set({
          token: null,
          userName: null,
          userProfile: null,
          isLoggedIn: false,
        });
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

      updateUserProfile: async (userData) => {
        const userName = get().userName;
        const token = get().token;
        const endpoint= `https://v2.api.noroff.dev/holidaze/profiles/${userName}`;
     
        if (!token || !userName) {
          console.error("Token or username not found in local storage.");
          return;
        }
        try {
          set({ loadingProfile: true });

          const updatedProfile = await updateProfile(
            userData,
            endpoint,
            token,
          
          );
          if (updatedProfile) {
            set({ userProfile: updatedProfile, loadingProfile: false });
            console.log("Profile updated successfully:", updatedProfile);
            return updatedProfile;
          } else {
            throw new Error("Failed to update profile");
          }
        } catch (error) {
          set({ loadingProfile: false });
          console.error("Error updating profile:", error);
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
    console.log("fetchVMVenues() is being called");
    const token = get().token;
    const userName = get().userName;

    if (!token || !userName) {
      console.error("Token or username not found in local storage.");
      set({
        vmVenues: null,
        loading: false,
        error: "Token or username not found in local storage.",
      });
      return;
    }

    try {
      set({ loading: true });
      const venues = await fetchVMVenues(userName, token);
      console.log("venues:", venues);
      if (venues) {
        set({ vmVenues: venues.data, loading: false });
        return venues;
      } else {
        throw new Error("Failed to fetch venues");
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
      set({
        vmVenues: null,
        loading: false,
        error: error.message || "Failed to fetch venues",
      });
      throw error;
    }
      },

deleteVenue: async (venueId) => {
  const token = get().token;
  const success = await deleteVenue(venueId, token);
  if (success) {
    set((state) => ({
      vmVenues: state.vmVenues.filter((venue) => venue.id !== venueId),
    }));
  }},

    }),

 

    {
      name: "auth-storage",
      storage: {
        getItem: (key) => JSON.parse(localStorage.getItem(key)),
        setItem: (key, value) =>
          localStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => localStorage.removeItem(key),
      },
    }
  )
);

export default useMyStore;
