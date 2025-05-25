import { create } from "zustand";
import { persist } from "zustand/middleware";
import fetchStays from "../API/FetchStays";
import fetchUserProfile from "../API/FetchUserProfile/index.js";
import fetchVMVenues from "../API/FetchVMVenues";
import deleteVenue from "../API/DeleteVenue";
import updateProfile from "../API/UpdateProfile/index.js";
import createVenue from "../API/CreateVenue";
import editVenue from "../API/EditVenue";
import FetchSingleVenue from "../API/FetchSingleVenue";
import { createJSONStorage } from "zustand/middleware";

const useMyStore = create(

  persist(

    
    (set, get) => ({
      stays: [],
      bookings: [],

      setStays: (newStays) => {
        set({ stays: newStays });
        localStorage.setItem("stays", JSON.stringify(newStays));
      
      },


   resetStore: () => {
get().persist.clearStorage();

    set({ stays: [], loading: false, error: false }); 
    window.location.reload(); 
  },

      setBookings: (newBookings) => {
        set({ bookings: newBookings });
        localStorage.setItem("bookings", JSON.stringify(newBookings));
      
      },

      vmBookings: [],
      setVmBookings: (newVMBookings) => {
        set({ vmBookings: newVMBookings });

        localStorage.setItem("vmBookings", JSON.stringify(newVMBookings));
       
      },
      selectedStay: null,
      token: null,
      userName: null,
      isLoggedIn: false,
      userProfile: null,
      loadingProfile: false,
      loginChecked: false,
      vmVenues: [],
      setVmVenues: (newVMVenues) => {
        set({ vmVenues: newVMVenues });
        localStorage.setItem("vmVenues", JSON.stringify(newVMVenues));
      },

      successMessage: "",
      venueData: null,

      setSuccessMessage: (message) => set({ successMessage: message }),

      login: (newToken, userName) => {
        if (newToken) {
          localStorage.setItem("token", newToken);
        }
        if (userName) {
          localStorage.setItem("userName", userName);
        }
        set({ token: newToken, userName, isLoggedIn: true });
      
      },

      setUserProfile: (profileData) => {
        set({ userProfile: profileData });
     
      },

      logout: () => {
        set({
          token: null,
          userName: null,
          userProfile: null,
          isLoggedIn: false,
        });
     
      },

      checkLoginStatus: () => {
        const token = get().token;
        const userName = get().userName;

  

        if (token && userName) {
          set({ isLoggedIn: true, loginChecked: true });
      
        } else {
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
        

          const profileData = await fetchUserProfile(userName, token);
          if (profileData) {
        
            set({ userProfile: profileData.data, loadingProfile: false });
       
            return profileData.data;
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
        const endpoint = `https://v2.api.noroff.dev/holidaze/profiles/${userName}`;

        if (!token || !userName) {
          console.error("Token or username not found in local storage.");
          return;
        }

        try {
          set({ loadingProfile: true });

          const updatedProfile = await updateProfile(userData, endpoint, token);
          if (updatedProfile) {
            set({ userProfile: updatedProfile, loadingProfile: false });
            localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
     

            const response = await fetch(endpoint, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": "f920c7be-b352-412a-bfe3-67cf36aebe41",
              },
              body: JSON.stringify(userData),
            });

            const refreshedProfile = await response.json();
            set({ userProfile: refreshedProfile, loadingProfile: false });

            return refreshedProfile;
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
         
          if (!fetchedStays || !Array.isArray(fetchedStays)) {
            set({ stays: [], loading: false });
          }
          set({ stays: fetchedStays, loading: false });
        } catch (error) {
          console.error("Error fetching stays:", error);
          set({ loading: false, error: true });
        }
      },

      fetchAndSetSelectedStay: async (id) => {
        try {
      
          if (!id) {
            console.error("Invalid stay ID:", id);
            return;
          }

          const data = await fetchStays();
          const selectedStay = data.find((stay) => stay.id === id);

          const response = await FetchSingleVenue(id);
          if (!response) {
            throw new Error("Invalid stay data");
          }
          set({ selectedStay: response });


          return response;
        } catch (error) {
          console.error("Error fetching stay data:", error);
          throw error;
        }
      },

      setSelectedStay: (stay) => {
        const { stays } = get();
        const completeStay = stays.find((s) => s.id === stay.id) || stay;

        set({ selectedStay: completeStay });


      },


      fetchVMVenues: async () => {
        const token = get().token;
        const userName = get().userName;

        if (!token || !userName) {
          console.error("Missing token or username.");
          set({ vmVenues: [], loading: false, error: "Authentication error." });
          return;
        }

        try {
          set({ loading: true });
          const userVenues = await fetchVMVenues(userName, token);
    

          if (userVenues && Array.isArray(userVenues)) {
            set({ vmVenues: userVenues, loading: false });

           

            return userVenues;
          } else {
            throw new Error("Invalid API response: expected an array.");
          }
        } catch (error) {
          console.error("Error fetching venues:", error);
          set({
            vmVenues: [],
            loading: false,
            error: error.message || "Failed to fetch venues",
          });
        }
      },


      setSelectedVenue: (venue) => {
        set({ selectedVenue: venue });
       
      },

      createNewVenue: async (venueData) => {
        const token = get().token;

        const response = await createVenue(token, venueData);

        if (!response || !response.data) {
          throw new Error("Venue creation failed");
        }

        const currentVmVenues = Array.isArray(get().vmVenues)
          ? get().vmVenues
          : [];
        const updatedVmVenues = [...currentVmVenues, response.data];

        set({ vmVenues: updatedVmVenues });
      },

      editVenue: async (updatedVenueData) => {
        const token = get().token;
        const userName = get().userName;

        
        if (!token || !userName) {
          console.error(
            "Authentication error: Token or username is missing or invalid."
          );
          throw new Error(
            "Authentication error: Token and username are required. Please login again."
          );
        }

        const selectedVenue = get().selectedVenue;
        const selectedVenueId = selectedVenue?.id;
  

        if (!token) {
          setError("api", { message: "Authentication error: Token missing." });
          return;
        }
        try {
          const updatedVenue = await editVenue(
            selectedVenueId,
            updatedVenueData,
            token
          );

      

          set((state) => ({
            vmVenues: state.vmVenues.map((v) =>
              v.id === selectedVenueId ? { ...v, ...updatedVenue.data } : v
            ),
            stays: state.stays.map((s) =>
              s.id === selectedVenueId ? { ...s, ...updatedVenue.data } : s
            ),
          }));

          await fetchVMVenues(userName, token);
          await fetchStays();

          set({ successMessage: "Venue updated successfully!" });
      
          return updatedVenue;
        } catch (error) {
          console.error("Error updating venue:", error);
          throw error;
        }
      },

      deleteVenue: async (venueId) => {
        const token = get().token;
        const userName = get().userName;

        const success = await deleteVenue(venueId, token);
        if (success) {
          set((state) => ({
            vmVenues: Array.isArray(state.vmVenues)
              ? state.vmVenues.filter((venue) => venue.id !== venueId)
              : [],
            stays: Array.isArray(state.stays)
              ? state.stays.filter((stay) => stay.id !== venueId)
              : [],
            successMessage: success ? "Venue deleted successfully!" : "Failed to delete venue.",
            messageType: success ? "success" : "error",
          }));

          await fetchVMVenues(userName, token);

          
        } else {
          setSuccessMessage: "Failed to delete venue.";
        }
      },

      fetchVMBookings: async () => {
        try {
          set({ loading: true, error: false });
          const fetchedBookings = await fetchVMBookings();
          set((state) => {
            const updatedBookings = [
              ...state.vmBookings,
              ...fetchedBookings.filter(
                (booking) =>
                  !state.vmBookings.some(
                    (existingBooking) => existingBooking.id === booking.id
                  )
              ),
            ];
            localStorage.setItem("vmBookings", JSON.stringify(updatedBookings));
            return { vmBookings: updatedBookings, loading: false };
          });
        } catch (error) {
          set({
            loading: false,
            error: true,
            errorMessage: error.message || "Failed to fetch bookings",
          });
        }
      },
    }),
{
    name: "auth-storage",
    storage: createJSONStorage(() => localStorage),
  },
   
  )
  
  
);

export default useMyStore;
